import { createWorker } from 'tesseract.js';

export const captchaImageWithTextByUrl =  async (url: string) => {
    try {
        const worker = await createWorker('eng');
        const ret = await worker.recognize(url);
        await worker.terminate();
    }
    catch (e: unknown){

    }
}