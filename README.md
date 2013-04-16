weigh-in
========

A simple node, jquery and flot based weight watcher.

Generate a graph of your fluctuating weight, fat and waist measurements.

To use, run weigh-in from within the distributed directory. It listens on port
6503. The distribution comes with one user, test, so pointing your browser at
http://localhost:6503/test will show you the test profile. To add a new
profile, create an empty file profile-name in the data directory and use
http://localhost:6503/profile-name to get started.

You may also need to update the jquery and flot lines at the top of weigh-in to
the correct locations for your system.

If you have any problems, please contact me at john@drystone.co.uk

