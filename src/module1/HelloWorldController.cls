public with sharing class HelloWorldController {

	public String AccountName { get; set; }

	public HelloWorldController() {

		//check the existence of the query parameter
		if(ApexPages.currentPage().getParameters().get('id') == null) {
			ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,'No Id Found'));
			return;
		}
		
		//check the format of expected parameters - this is good for SOQL injection protection
		ID accountID = null;
		try {
		    accountID = ApexPages.currentPage().getParameters().get('id'); 
		}	catch(Exception ex) { 
			ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.FATAL,'Not a valid ID'));
			return;
		}

		accountID = ApexPages.currentPage().getParameters().get('id'); 
		List<Account> accountList = [SELECT ID, Name from ACCOUNT WHERE Id =: accountID LIMIT 1];

		if(accountList.size() == 1) {
			this.AccountName = accountList[0].Name;
		} 
		else { 
			// Build custom error for messages component
			ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR,'There is no account for that ID','Failed SOQL for ' + accountID));
		} 

	}

}