import { Injectable } from '@nestjs/common';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class PdfService {
    public async parsePdfFromBuffer(data: Buffer) {
        const { text } = await pdfParse(data);

        return text;
    }
}
