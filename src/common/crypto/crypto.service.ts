import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, createHash } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class CryptoService {
    private algorithm = 'aes-256-ctr';
    private public_key = fs.readFileSync(path.join(__dirname, '../../authentication/key/key_rsa.pub.pem'), 'utf-8')
    private iv = '1vs3cr3t';
    constructor(){}

    async encryptData(data: string) {
        const key = createHash('sha512').update(String(this.public_key)).digest('hex').substring(0,32);
        const civ = createHash('sha512').update(this.iv).digest('hex').substring(0,16);
        const cipher = createCipheriv(this.algorithm, key, civ);
        const encryptedData = Buffer.from(cipher.update(data, 'utf-8', 'hex')+cipher.final('hex')).toString('base64');
        return encryptedData;
    }

    async dcryptData(encryptedData: string) {
        const key = createHash('sha512').update(String(this.public_key)).digest('hex').substring(0,32);
        const civ = createHash('sha512').update(this.iv).digest('hex').substring(0,16);
        const buff = Buffer.from(encryptedData, 'base64');
        const decipher = createDecipheriv(this.algorithm, key, civ);
        const dcryptedData = decipher.update(buff.toString('utf-8'), 'hex', 'utf-8')+decipher.final('utf-8');
        return dcryptedData;
    }
}
