import * as esbuild from 'esbuild';
import packageJson from './package.json' assert { type: 'json' };

const dependencies = packageJson?.dependencies ?? {};
const peerDependencies = packageJson?.peerDependencies ?? {};

try {
    await esbuild.build({
        entryPoints: ['src/**/index.ts'],
        outdir: 'dist',
        bundle: true,
        sourcemap: true,
        format: 'esm',
        target: ['es6'],
        plugins: [
        ],
        external: [].concat.apply([], [Object.keys(dependencies), Object.keys(peerDependencies)])
    });
    console.log('Build complete');
} catch (e) {
    console.log(e);
    process.exit(1);
}