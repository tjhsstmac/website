![TJMAD Club Homepage](/tjmad_club_homepage.png)

# TJMAD Club Website

This repository hosts the code for the [TJMAD club site](https://activities.tjhsst.edu/mobileapps). 

## For Contributors/Future Developers

The site is made using React, TypeScript and Vite. To host the site on TJ domains, you must use 
[Director](https://director.tjhsst.edu) and ask the sponsor/eighth period office for access to the 
project. 

All assets are in the `src/assets` folder and in WebP format. Assets that may be frequently changed
have PDN files, which can be provided upon request.

To contribute to the site, you will first need to install:
* [nodejs](https://nodejs.org)
* [git](https://git-scm.com)

Then, you can clone the repository onto your computer by running:
```bash
git clone https://github.com/tjhsstmac/website
```

`cd` into the new directory, and install the required packages:
```bash
npm install
```

Now, the setup is complete and you can start contributing!

### Development Workflow

Use a branch for changes so GitHub can test them before they go live:
```bash
git checkout main
git pull origin main
git checkout -b feature/my-change
npm run dev
```

Before pushing, run:
```bash
npm run lint
npm run build
```

Commit both the source changes and the updated `dist/` output:
```bash
git add path/to/changed-files dist
git commit -m "feat: describe the change"
git push origin feature/my-change
```

Open a pull request on GitHub. The CI workflow runs lint and build against the
branch. Merge the pull request into `main` only after the checks pass and the
local preview looks correct.

### Helpful Info

Below are the necessary commands to interact with the project:

To build the site, run the following command,
```bash
npm run build
```

To run the Vite development server, run the following command,
```bash
npm run dev
```

To preview the site, you can use,
```bash
npm run preview
```

Director runs `/site/run.sh`, which should switch into `/site/public` and execute
the checked-in `run.sh`. Director's current Node image is too old to build this
Vite app, so `dist/` is committed and `run.sh` serves the prebuilt bundle on
Director's internal port.

After merging to `main`, deploy intentionally from the Director terminal:
```bash
cd /site/public
wget -O site.tar.gz https://github.com/tjhsstmac/website/archive/refs/heads/main.tar.gz
tar -xzf site.tar.gz --strip-components=1
rm site.tar.gz
chmod +x /site/public/run.sh
printf '%s\n' '#!/bin/sh' 'set -eu' '' 'cd /site/public' 'exec ./run.sh' > /site/run.sh
chmod +x /site/run.sh
```

Then click **Restart service** in Director.
