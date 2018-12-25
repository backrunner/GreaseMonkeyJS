function fuckcsdn(){
	if (typeof window.csdn != 'undefined'){
		if (typeof window.csdn.anonymousUserLimit == 'object'){
			window.csdn.anonymousUserLimit = "no";
		} else {
			setTimeout(function(){
				fuckcsdn();
			},200);
		}
	} else {
		setTimeout(function(){
			fuckcsdn();
		},200);
	}
}

fuckcsdn();