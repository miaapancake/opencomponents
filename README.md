# OpenComponents
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/OpenThingies/OpenComponents/tree/mistress.svg?style=svg&circle-token=6effba72cd3af2f9d2c14b3983df7e9e5bf2f369)](https://dl.circleci.com/status-badge/redirect/gh/OpenThingies/OpenMoodServer/tree/mistress)
A React component library made by the OpenThingies team.
The library is mainly used by projects from the OpenThingies team.

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
