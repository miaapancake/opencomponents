<!--
logo
-->
[![Open Components](https://raw.githubusercontent.com/OpenThingies/Assets/mistress/img/OpenComponents/opencomponentsfull.png)](https://github.com/OpenThingies/Components)

<!-- 
badges
-->
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/OpenThingies/Components/tree/mistress.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/OpenThingies/Components/tree/mistress)

<!--
description
-->
A React component library made by the OpenThingies team.
The library is mainly used by projects from the OpenThingies team.


<!--
instructions
-->
## Installation/Use

1. First install the package with your preferred package manager

    Yarn:
    ```bash
    yarn add opencomponents
    ```
    NPM:
    ```bash
    npm i opencomponents
    ```

2. Then import the css file in the root of your react component tree (usually your App component):

    ```jsx
    import 'opencomponents/lib/style.css';

    function App() {
        // Your root component logic
    }

    export default App;
    ```

    now you should have everything set up to use.

## Development

### Building the project

- To build the project for production simply run
    ```bash
    # with yarn
    yarn build

    # with npm
    npm run-script build
    ```
    the build files will be emited to `/lib`

- To view and manage the components in storybook run
    ```bash
    # with yarn
    yarn storybook

    # with npm
    npm run-script storybook
    ```
