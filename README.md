# ADP-World-Downloader

The payroll & HR service provider ADP switched from sending letters to a website, containing download links.
If you don't like to manually download your payroll documents each month, you can alternatively use this script. It downloads the 20 most recent documents from ADP World into a folder of choice.

## Installation ##

1. Install phantomJS and casperJS
   1. phantomJS:
      Try your package manager first. If you are on ARM and your distro offers nothing, there are precompiled binaries out there, just google for "phantomJS arm" and you will find sth.
   2. casperJS:
      If the package manager way does not work, you can always download the binary distribution from their website. casperJS is just a bunch of JavaScript on top of phantomJS.
2. Download this script via "git clone https://github.com/vjay82/ADP-World-Downloader.git"
3. Add your credentials to the header of adp.js.
4. Test the script via "casperjs adp.js".
5. Add it to systemd/cron.
6. Forget about ADP.
