## trustlines-network clientlib react-docs

Repository of the [documentation page](https://trustlines-protocol.github.io/clientlib-docs/) of the trustlines-network clientlib Javascript library. It uses [react-docs](https://github.com/0xProject/0x-monorepo/tree/development/packages/react-docs) to render the documentaion of the Typescript project [trustlines-network/clientlib](https://github.com/trustlines-network/clientlib).

### Install Dependencies

```bash
yarn install
```

### Run dev server

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Clean

```bash
yarn clean
```

### Lint

```bash
yarn lint
```

### Deploy to gh-pages

```bash
yarn deploy
```

### How to add or change documentation content

All text files are `.md`s in the [/md](https://github.com/trustlines-network/clientlib-docs/tree/master/md) folder. You can modify existing documenation text in the individual files.

To add a new `.md` file, you need to add your new files to `ts/docs.tsx`:

1. Link newly created `md` file by defining `const` after `import * as v0TypeDocJson from './json/x.x.x.json';`
2. Add new sections in `const docSections = {`
3. Define the order of the added sections in `const docsInfoConfig: DocsInfoConfig = {`
4. Add ... after `sectionNameToMarkdown: {`
5. Define the heading for the new section in `sectionNameToModulePath: {`
6. Add ... after `typeNameToDocSection: {`


