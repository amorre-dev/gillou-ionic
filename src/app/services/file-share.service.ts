import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

/** Hands files to the system share sheet on a device, or downloads them in a browser. */
@Injectable({
  providedIn: 'root',
})
export class FileShareService {
  private readonly native = Capacitor.isNativePlatform();

  /** True when a share sheet exists (device, or a browser with the Web Share API). */
  get canShare(): boolean {
    return this.native || typeof navigator.share === 'function';
  }

  async shareText(fileName: string, content: string, mimeType: string, title: string) {
    if (this.native) {
      const { uri } = await Filesystem.writeFile({
        path: fileName,
        data: content,
        directory: Directory.Cache,
        encoding: Encoding.UTF8,
      });
      await Share.share({ title, files: [uri], dialogTitle: title });
      return;
    }
    this.download(fileName, new Blob([content], { type: mimeType }));
  }

  /**
   * Shares an image (plus optional text) through the share sheet. Social apps keep the
   * image and usually drop prefilled text, which is why the numbers are drawn on the image.
   */
  async shareImage(fileName: string, image: Blob, text: string, title: string) {
    if (this.native) {
      const { uri } = await Filesystem.writeFile({
        path: fileName,
        data: await blobToBase64(image),
        directory: Directory.Cache,
      });
      await Share.share({ title, text, files: [uri], dialogTitle: title });
      return;
    }
    const file = new File([image], fileName, { type: image.type });
    if (typeof navigator.share === 'function' && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title, text, files: [file] });
      return;
    }
    this.download(fileName, image);
  }

  /** Lets the user pick a text file and resolves with its content (null when cancelled). */
  pickTextFile(accept: string): Promise<string | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      input.style.display = 'none';
      input.onchange = async () => {
        const file = input.files?.[0];
        input.remove();
        resolve(file ? await file.text() : null);
      };
      input.oncancel = () => {
        input.remove();
        resolve(null);
      };
      document.body.appendChild(input);
      input.click();
    });
  }

  private download(fileName: string, blob: Blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.readAsDataURL(blob);
  });
}
