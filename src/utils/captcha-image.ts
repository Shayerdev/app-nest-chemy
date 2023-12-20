import { createWorker } from 'tesseract.js';

export const captchaImageWithTextByUrl =  async (url: string) => {
    try {
        const worker = await createWorker('eng');
        const res = await worker.recognize(url);
        console.log(res);
        await worker.terminate();
        //return res.data.text;
    }
    catch (e: unknown){
        console.log(e)
    }
}