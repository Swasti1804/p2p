import archiver from 'archiver';
import { PassThrough } from 'stream';

export const bundleZip = async (files, promptId) => {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const passthrough = new PassThrough();
    const chunks = [];

    passthrough.on('data', chunk => chunks.push(chunk));
    passthrough.on('end', () => resolve(Buffer.concat(chunks)));
    archive.on('error', err => reject(err));

    archive.pipe(passthrough);

    files.forEach(file => {
      archive.append(file.content, { name: file.fileName });
    });

    archive.finalize();
  });
};
