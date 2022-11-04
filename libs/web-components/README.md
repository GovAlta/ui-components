# GoA Web components

(See)[https://ui-components-ui-components-dev.os99.gov.ab.ca/?path=/story/overview--page]

## Setup
```bash
# run this on Debain/Ubuntu
sudo apt install inotify-tools 

# run this on Redhat distros
sudo dnf install inotify-tools 
```


## Create

### Create a svelte component
```bash
make csc name=SomeComponent
```

### Create react component
```bash
make crc name=SomeComponent
```

## Build 

```bash
make build
```

## Storybook

### Start storybook and compile web component on svelte file changes
```bash
make storybook
```

### Create a new storybook file
```bash
make storybook-new name=SomeComponent
```


## TEST

```bash
make test
```


## Troubleshooting

If you are running out of file watchers you can up the limit with the following:

```bash
sudo sysctl -w fs.inotify.max_user_watches=524288
echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf
```
