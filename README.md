<!--
logo
-->
[![Open Components](https://git.openthingies.com/OpenThingies/assets/raw/branch/mistress/img/OpenComponents/opencomponentsfull.png)](https://git.openthingies.com/OpenThingies/components)

<!-- 
badges
-->
[![DroneCI](https://img.shields.io/drone/build/OpenThingies/components?label=CI&server=https://ci.openthingies.com&style=for-the-badge)](https://ci.openthingies.com/OpenThingies/components)

<!--
description
-->
A React component library made by the OpenThingies team.
The library is mainly used by projects from the OpenThingies team.


<!--
instructions
-->
## Installation/Use

1. Install the package with your preferred package manager

    Yarn:
    ```bash
    yarn add @openthingies/components
    ```
    NPM:
    ```bash
    npm i @openthingies/components
    ```

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
