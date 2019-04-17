' setUp

Dim testApplication
Dim testPage
Dim strLocation
Dim strToday
Dim objPageElement
Dim objWshShell

testApplication		= "firefox"
testPage			= "www.google.de"
strLocation			= "FFM - Commerzbank"
strToday			= date()
Set objPageElement	= Browser("Browser").Page("Google").WebElement("divLandingPage").WebEdit("textboxGoogleSuche")
Set objWshShell		= CreateObject( "WScript.Shell" )

' testStep
 @@ script infofile_;_ZIP::ssf1.xml_;_
objWshShell.Popup strLocation & vbNewLine & strToday, 5, "UFT - Live Demo by profi.com", vbInformation + vbSystemModal
SystemUtil.Run testApplication, testPage

If objPageElement.Exist( 3 ) Then
	
	objPageElement.Highlight
	objPageElement.Click
	objWshShell.SendKeys strLocation & " " & strToday
	objWshShell.SendKeys "{ENTER}"
	
End If

' tearDown

objWshShell.Popup "Test done", 3, "UFT - Live Demo by profi.com", vbInformation + vbSystemModal
SystemUtil.CloseProcessByName testApplication + ".exe"

testApplication		= Empty
testPage			= Empty
strLocation			= Empty
strToday			= Empty
Set objPageElement	= Nothing
Set objWshShell		= Nothing
