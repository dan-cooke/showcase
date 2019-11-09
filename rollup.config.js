import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [{
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'es',
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies),
        ...Object.keys(pkg.peerDependencies),
    ],
    plugins: [
        postcss({
            inject: true,
        }),
        typescript({
            typescript: require('typescript'),
        })
    ]
};