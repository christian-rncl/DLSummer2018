import sys
import pip
import os
from subprocess import call

def install(packages):
    pip.main(['install', packages])

def get_pytorch():
    ##Install torch
    # http://pytorch.org/
    if 'torch' not in sys.modules:
        from os import path
        from wheel.pep425tags import get_abbr_impl, get_impl_ver, get_abi_tag
        platform = '{}{}-{}'.format(get_abbr_impl(), get_impl_ver(), get_abi_tag())

        accelerator = 'cu80' if path.exists('/opt/bin/nvidia-smi') else 'cpu'
        call(["pip install -q http://download.pytorch.org/whl/{accelerator}/torch-0.3.0.post4-{platform}-linux_x86_64.whl torchvision"])

def get_pil():
    call(['pip install --no-cache-dir -I pillow'])

def get_fastai():
    if 'fastai' not in sys.modules:
        install('fastai')

def get_kaggle():
    if 'kaggle-cli' not in sys.modules:
        install('kaggle-cli')

def get_modules(modules=None):
    ##install modules
    if modules is None:
        get_pil()
        get_pytorch()
        get_fastai()
        get_kaggle()
