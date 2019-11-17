<#
.SYNOPSIS
  Add a Bowling Score to the list.
.DESCRIPTION
  Add a Bowling Score to the list.
.PARAMETER <>
    The x of the .
.INPUTS
  <Inputs if any, otherwise state None>
.OUTPUTS
  <Outputs if any, otherwise state None - example: Log file stored in C:\Windows\Temp\<name>.log>
.NOTES
  Version:        0.0.1
  Author:         Alex Hedley
  Creation Date:  17/11/2019
  Release Date:   dd/mm/yyyy
  Purpose/Change: Initial script release
  
.EXAMPLE
  Call '' to
  # https://github.com/Protirus/OneMinuteWith/blob/master/scripts/AppendInterview.ps1
.FUNCTIONALITY
   Add a Bowling Score to the list.
#>


#---Variables---#

#region Variables

$jsonFileName = "../docs/data/scores.json"

#endregion


#---Functions---#

#region Functions

Function GetJsonFilePath
{
    <#
    #.PARAMETER Id
    #    The Id number of the Accessory
    
    .EXAMPLE
        GetJsonFilePath
    #>

    $path = $PSScriptRoot

    $currentDir = Get-Item -Path $path

    $parent = $currentDir.parent;

    $scores = Join-Path -Path $parent.FullName -ChildPath "scores"

    $jsonPath = Join-Path -Path $scores -ChildPath $jsonFileName

    $exists = Test-Path -Path $jsonPath

    if (!$exists)
    {
        New-Item -Path $jsonPath -ItemType File
    }
    
    return $jsonPath
}

Function ParseAndValidateJson($filePath)
{
    <#
    .PARAMETER filePath
        The json file to validate
    
    .EXAMPLE
        ParseAndValidateJson -filePath "c:\temp\scores.json"
    #>

    [hashtable]$Return = @{} 
    $Return.Success = 0
    $Return.Data = {}
    $Return.ErrorReason = ""

    $fileContents = Get-Content -Path $filePath | Out-String

    #if ($fileContents -eq $null)
    if ($null -eq $fileContents)
    {
        $ErrorReason = "Scores is empty"
        Write-Host $ErrorReason

        $Return.Success = $false
        $Return.Data = $null
        $Return.ErrorReason = $ErrorReason
        return $Return
    }

    try
    {
        $jsonContent = ConvertFrom-Json -InputObject $fileContents

        Write-Host "Json is valid"
        $Return.Success = $true
        $Return.Data = $jsonContent
        return $Return
    }
    catch
    {
        Write-Host $_
        $ErrorReason = "Json is not valid"
        Write-Host $ErrorReason

        $Return.Success = $false
        $Return.Data = $null
        $Return.ErrorReason = $ErrorReason
        return $Return
    }

    return $Return
}

Function InputScore
{
    <#
    #.PARAMETER 
    #    The json file to validate
    
    .EXAMPLE
        InputScore
    #>

    #Write-Host "--Add Score Record--"

    #Write-Host "Please Enter The Employee's First Name"
    #$inputFirstName = Read-Host

    #Write-Host "Please Enter The Employee's Last Name"
    #$inputLastName = Read-Host

    #Write-Host "Please Enter The Employee's Role"
    #$inputRole = Read-Host

    #Write-Host "Please Enter A Short Description Of The Employee"
    #$inputShortDescription = Read-Host

    #Write-Host "Please Enter The GitHub Interview Url"
    #Write-Host -ForegroundColor DarkYellow "aka https://github.com/Protirus/OneMinuteWith/blob/master/scores/ProtirusEmployee.md"
    #$inputInterviewUrl = Read-Host
    #$inputFileName = Split-Path $inputInterviewUrl -Leaf

    #Write-Host "Please Enter The Thumbnail Employee Picture Url"
    #Write-Host -ForegroundColor DarkYellow "aka https://avatars2.githubusercontent.com/u/33064621?s=460&v=4"
    #$inputThumbnailImageUrl = Read-Host

    #Write-Host "Please Enter The Formal Employee Picture Url"
    #Write-Host -ForegroundColor DarkYellow "aka https://avatars2.githubusercontent.com/u/33064621?s=460&v=4"
    #$inputFormalImageUrl = Read-Host
    
    #Write-Host "Please Enter The Informal (Fun) Employee Picture Url"
    #$inputInformalImageUrl = Read-Host
    #Write-Host -ForegroundColor DarkYellow "aka https://avatars2.githubusercontent.com/u/33064621?s=460&v=4"

    #Write-Host "Please Enter The Date Of The Score (dd/MM/yyyy)"
    #$inputInterviewDate = Read-Host

    #$inputScore = New-Object -TypeName psobject

    #$inputName = New-Object -TypeName psobject
    #$inputName | Add-Member -MemberType NoteProperty -Name firstName -Value $inputFirstName
    #$inputName | Add-Member -MemberType NoteProperty -Name lastName -Value $inputLastName
    #$inputName | Add-Member -MemberType NoteProperty -Name fullName -Value "$inputFirstName $inputLastName"

    #$inputInterview | Add-Member -MemberType NoteProperty -Name employeeName -Value $inputName
    ##$inputInterview | Add-Member -MemberType NoteProperty -Name employeeName -Value "$inputFirstName $inputLastName"
    #$inputInterview | Add-Member -MemberType NoteProperty -Name employeeRole -Value $inputRole
    #$inputInterview | Add-Member -MemberType NoteProperty -Name shortDescription -Value $inputShortDescription
    #$inputInterview | Add-Member -MemberType NoteProperty -Name interviewUrl -Value $inputInterviewUrl
    #$inputInterview | Add-Member -MemberType NoteProperty -Name thumbnailImageUrl -Value $inputThumbnailImageUrl
    #$inputInterview | Add-Member -MemberType NoteProperty -Name fileName -Value $inputFileName
    #$inputInterview | Add-Member -MemberType NoteProperty -Name formalImageUrl -Value $inputFormalImageUrl
    #$inputInterview | Add-Member -MemberType NoteProperty -Name informalImageUrl -Value $inputInformalImageUrl
    #$inputInterview | Add-Member -MemberType NoteProperty -Name interviewDate -Value $inputInterviewDate

    Write-Host "New bowling score record:"
    Write-Host ($inputScore | Format-List | Out-String)

    [hashtable]$Return = @{} 
    $Return.Save = $false
    $Return.Score = {}

    $saveScore = {

        $addRecord = Read-Host -Prompt "Would you like to add this Score record to Bowling View? (Y/N)"

        If ($addRecord.ToLower() -eq "y")
        {
            Write-Host "Saving Score"

            $Return.Save = $true
            $Return.Score = $inputScore
            return $Return
        }
        Elseif ($addRecord.ToLower() -eq "n")
        {
            Write-Host "Not saving score"
            $Return.Save = $false
            $Return.Score = $null
            return $Return
        }
        Else
        {
            Write-Host "Please answer Y or N!" -BackgroundColor Red
            &$saveScore 
        }
    }

    &$saveScore
}

Function SaveToFile($filePath, [array]$data)
{
    <#
    .PARAMETER filePath
        The json file to save
    .PARAMETER data
        The data to add to the file

    .EXAMPLE
        SaveToFile -filePath "c:\temp\scores.json" -data "..."
    #>

    $jsonString = ConvertTo-Json @($scores) | Out-String

    Out-File -FilePath $filePath -InputObject $jsonString
}

#endregion

#--Implementation--#

#region Implementation

Clear-Host

$scoresJsonPath = GetJsonFilePath

$parseResult = ParseAndValidateJson($scoresJsonPath)

[PsObject[]]$scores = @()

if ($parseResult.Success -eq $true)
{
    #add score to array

    [array]$scores = $parseResult.Data
}

$score = InputScore

if ($score.Save)
{
    $scores += $score.Score

    SaveToFile $scoresJsonPath $scores

    Write-Host -ForegroundColor Green "Updated $scoresJsonPath"
}
else
{
    Write-Host -ForegroundColor Yellow "No changes have been made to $scoresJsonPath"
}

#endregion