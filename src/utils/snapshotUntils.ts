import html2canvas from "html2canvas";
type RESULT = 'base64' | 'file'
type RR = {
  'base64': string
  'file': File
}

export function snapshotElement<T extends 'base64' | 'file'>(el: HTMLElement, type: T): Promise<T extends 'base64' ? string : File> {
  return new Promise((resolve, reject) => {
    try {
      html2canvas(document.getElementById('chartDom') as HTMLDivElement, {
        // useCORS: true,
        allowTaint: true,
      }).then((canvas) => {
        const link = canvas.toDataURL("image/jpg");
        if (type === 'base64') resolve(link as T extends 'base64' ? string : never)
        else if (type === 'file'){
          let binary = atob(link.split(",")[1]);
          let array = [];
          for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
          }
          let blob = new Blob([new Uint8Array(array)], {type: "image/png"});
          resolve(new File([blob], Date.now() + ".png") as any)
        }
      });
    } catch (err) {
      reject(err)
    }
  })
}