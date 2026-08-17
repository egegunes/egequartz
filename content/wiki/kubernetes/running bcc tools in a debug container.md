BCC - Tools for BPF-based Linux IO analysis, networking, monitoring, and more
https://github.com/iovisor/bcc

```
$ kubectl debug node/default-pool-3mrgkk --image debian -it --profile=sysadmin --share-processes=true -- bash

apt update
apt install bpfcc-tools/stable
ln -s /host/lib/modules/ /lib/modules 
ln -s /host/usr/src/* /usr/src/ 
mount -t debugfs debugfs /sys/kernel/debug 
mount -t tracefs tracefs /sys/kernel/tracing 
cachetop-bpfcc
```