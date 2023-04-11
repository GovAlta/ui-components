import { Uploader } from "./types";

export class MockUploader implements Uploader {
  private processId?: any;

  public onprogress: (percent: number) => void = (_: number) => {};
  public onabort: () => void = () => {};
  public onfail: (err: string) => void = (_: string) => {};
  public oncomplete: () => void = () => {};

  upload(_url: string | ArrayBuffer) {
    let progress = 0;

    this.processId = setInterval(() => {
      progress += Math.random() * 10;
      this.onprogress(progress);
      if (progress >= 100) {
        this.oncomplete();
        clearInterval(this.processId);
      }
    }, 200);
  }

  abort() {
    clearInterval(this.processId);
    this.onabort();
  }
}
