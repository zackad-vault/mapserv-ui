tools='';
flag=0
if ! hash nodejs 2>/dev/null; then
	# echo "nodejs is not installed on your system. install it with 'apt-get install nodejs'";
	tools=$tools'nodejs ';
	flag=1;
fi
if ! hash npm 2>/dev/null; then
	# echo "npm is not installed on your system. install it with 'apt-get install npm'";
	tools=$tools'npm ';
fi
if ! hash git 2>/dev/null; then
	# echo "git is not installed on your system. install it with 'apt-get install git'";
	tools=$tools'npm ';
fi
if ! hash bower 2>/dev/null; then
	# echo "bower is not installed on your system. install it with 'npm install -g bower'";
	tools=$tools'bower ';
	flag=1;
fi
if ! hash minify 2>/dev/null; then
	# echo "minify is not installed on your system. install it with 'npm install -g minify'";
	tools=$tools'minify ';
	flag=1;
fi
if ! hash ruby 2>/dev/null; then
	# echo "ruby is not installed on your system. install it with 'apt-get install ruby'";
	tools=$tools'ruby ';
	flag=1;
fi
if ! hash sass 2>/dev/null; then
	# echo "sass is not installed on your system. install it with 'gem install sass'";
	tools=$tools'sass ';
	flag=1;
fi
if [ $flag = 0 ]; then
	echo "all the necessary tool already installed. \nOK.";
else
	echo "following tools is not installed on your system : $tools";
	exit 1;
fi
