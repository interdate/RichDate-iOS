
var IAP = {
//list: [ 'richdate.oneMonth', 'richdate.threeMonths', 'richdate.sixMonths', 'richdate.oneYear'],
list: [ 'richdate.oneMonthNAR', 'richdate.threeMonthsNAR'],
products: {}
};
var localStorage = window.localStorage || {};

IAP.initialize = function () {
   
	// Check availability of the storekit plugin
	if (!window.storekit) {
		console.log('In-App Purchases not available');
		return;
	}
    
    if(app.apnInitialized){
        return;
    }
    
    app.apnInitialized = true;
    
    
	
	// Initialize
	storekit.init({
				  debug:    true,
				  ready:    IAP.onReady,
				  purchase: IAP.onPurchase,
				  restore:  IAP.onRestore,
				  error:    IAP.onError
				  });
};

IAP.onReady = function () {
    
    
    
    
	// Once setup is done, load all product data.
	storekit.load(IAP.list, function (products, invalidIds) {
				  console.log('IAPs loading done:');
				  for (var j = 0; j < products.length; ++j) {
				  var p = products[j];
				  console.log('Loaded IAP(' + j + '). title:' + p.title +
							  ' description:' + p.description +
							  ' price:' + p.price +
							  ' id:' + p.id);
				  IAP.products[p.id] = p;
				  }
				  IAP.loaded = true;
				  for (var i = 0; i < invalidIds.length; ++i) {
				  console.log('Error: could not load ' + invalidIds[i]);
				  }
				  IAP.render();
				  });
};

IAP.render = function () {
	if (IAP.loaded) {
		
		console.log(IAP.list);
		console.log(IAP.products);
		
		var template = $('#subscrItemTemplate').html();
		$('#subscrList').html('');
		for (var id in IAP.products) {
			var currentTemplate = template;
			var product = IAP.products[id];
			//currentTemplate = currentTemplate.replace("[TITLE]",product.title);
			if(product.id == 'richdate.oneMonthNAR')
    			currentTemplate = currentTemplate.replace("[TITLE]","מנוי חודשי בריצ'דייט");
			else if(product.id == 'richdate.threeMonthsNAR')
				currentTemplate = currentTemplate.replace("[TITLE]","מנוי לשלושה חודשים בריצ'דייט");
			
			currentTemplate = currentTemplate.replace("[PRICE]",product.price);
			currentTemplate = currentTemplate.replace("[PURCHASE_ID]",product.id);
			
			$('#subscrList').append(currentTemplate);
			
		}
		
		
		
		
		//alert($('#subscrList').html());
		
	}
	else {
		alert("In-App Purchases not available");
	}
};




IAP.onPurchase = function (transactionId, productId) {
	
	if(transactionId > 0){
		
		switch(productId){
			case 'richdate.oneMonthNAR':
				var monthsNumber = 1;
				break;
				
			case 'richdate.threeMonthsNAR':
				var monthsNumber = 3;
				break;
				
			case 'richdate.sixMonths':
				var monthsNumber = 6;
				break;
				
			case 'richdate.oneYear':
				var monthsNumber = 12;
				break;
	}
		
		
		
	$.ajax({
		url: app.apiUrl + '/api/v4/user/subscription/monthsNumber:'+monthsNumber,
		type: 'Post',
		success: function(data, status){
			//alert(JSON.stringify(data));
		   app.stopLoading();
		   app.alert('Congratulations on your purchase of a paid subscription to richdate.co.il');
		   app.chooseMainPage();
			   
			/*
			if(data.result == true){
			alert('Congratulations on your purchase of a paid subscription to Dating4Disabled.com');
			}
			*/
		}
	});
        
		
	}
	/*
	 var n = (localStorage['storekit.' + productId]|0) + 1;
	 localStorage['storekit.' + productId] = n;
	 if (IAP.purchaseCallback) {
	 IAP.purchaseCallback(productId);
	 delete IAP.purchaseCallbackl;
	 }
	 */
};


IAP.onError = function (errorCode, errorMessage) {
	//alert('Error: ' + errorMessage);
};

IAP.onRestore = function (transactionId, productId) {
	/*
	console.log("Restored: " + productId);
	var n = (localStorage['storekit.' + productId]|0) + 1;
	localStorage['storekit.' + productId] = n;
	 */
	
	if(transactionId > 0){
		app.alert('Congratulations on your purchase of a paid subscription to richdate.co.il');
	}
	
	app.chooseMainPage();
	
};

IAP.buy = function (productId, callback) {
	IAP.purchaseCallback = callback;
	storekit.purchase(productId);
};

IAP.restore = function () {
	storekit.restore();
};

IAP.fullVersion = function () {
	return localStorage['storekit.richdate.oneMonthNAR','storekit.richdate.threeMonthsNAR'];
};
