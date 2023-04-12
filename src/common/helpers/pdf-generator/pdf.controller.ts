import { NextFunction } from 'express';
import * as fs from 'fs';
import { basicConfig } from 'src/common/constants/configuration';
const readFile = require('util').promisify(fs.readFile);
const hbs = require('hbs');
const pdf = require('html-pdf'); 
import { v4 as uuidv4 } from 'uuid';
import {Request, Response} from 'express';
var path = require('path');

exports.print = async (req, res) => { 
    const data = req;
    var file = path.join(__dirname, './templates/pdf.hbs');
    const content  = await readFile(file, 'utf8');  
    const template = hbs.compile(content);
    const html = template({ data });

    const options = {
        base: `http://localhost:${basicConfig.SERVER_PORT}`,
        format: 'A4',
        border: {
            "top": "0.6in",            
            "bottom": "0.6in",
            "left": "0.5in",
            "right": "0.5in"
          },
    }

    const outputFileName = `download/${uuidv4()}.pdf`;
    const filePath = `${outputFileName}`;
    pdf.create(html, options).toFile(filePath, (err, req: Request, res: Response, next: NextFunction) => {  
        if (err) return console.log(err);
        return {file: filePath}
    });
    return filePath;
}