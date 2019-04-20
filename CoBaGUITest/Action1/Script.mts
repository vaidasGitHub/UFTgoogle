' setUp

Dim testApplication
Dim testPage
Dim strLocation
Dim strToday
Dim objPageElement1
Dim objPageElement2
Dim objWshShell

testApplication     = "firefox"
testPage            = "www.google.de"
strLocation         = "FFM - Commerzbank"
strToday            = date()
Set objPageElement1	= Browser( "browser" ).Page( "pageGoogleLanding" ).WebEdit( "textboxGoogleSuche" )
Set objPageElement2	= Browser( "browser" ).Page( "pageGoogleResult" ).WebElement( "divResult" )
Set objWshShell     = CreateObject( "WScript.Shell" )

' testStep

objWshShell.Popup strLocation & vbNewLine & strToday, 5, "UFT - Live Demo by profi.com", vbInformation + vbSystemModal

SystemUtil.Run testApplication, testPage

If Not objPageElement1.Exist( 3 ) Then
    Reporter.ReportEvent micFail, "Action", "Couldn't find " & objPageElement1.ToString
    EndTest
Else
    objPageElement1.Highlight
    objPageElement1.Click
    objWshShell.Sendkeys strLocation & " " & strToday
    objWshShell.SendKeys "{ENTER}"
    Reporter.ReportEvent micPass, "Action", "Inserting search values " & strLocation & " " & strToday
End If

If Not objPageElement2.Exist( 3 ) Then
    Reporter.ReportEvent micFail, "Verification", "Google result page element NOT found"
    EndTest
Else
    objPageElement2.Highlight
    Reporter.ReportEvent micPass, "Verification", "Google result page element found"
End If

' tearDown

EndTest

Sub EndTest()
    SystemUtil.CloseProcessByName testApplication + ".exe"
    ExitTest
End Sub

testApplication     = Empty
testPage            = Empty
strLocation         = Empty
strToday            = Empty
Set objPageElement1	= Nothing
Set objPageElement2	= Nothing
Set objWshShell     = Nothing
