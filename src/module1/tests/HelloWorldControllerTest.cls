@isTest
private class HelloWorldControllerTest {

	@isTest
	static public void testHelloWorldController() {

		//Set test page
		Test.setCurrentPage(Page.HelloWorld);

		//Set test data
		Account a = new Account(Name='TestCo');
		insert a;

		//Set test params
		ApexPages.currentPage().getParameters().put('id', a.Id);

		//Construct controller
		HelloWorldController vc = new HelloWorldController();

		//Make assertions
		System.assertEquals('TestCo',vc.AccountName);
	}
	
}