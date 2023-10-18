function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reverseStr = reverseListOfChars.join('');

    return reverseStr;
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    if(reverse === str) {
        return true;
    }
    else {
        return false;
    }
}

function convertDateToStr(date) {
    var strDate = { day:'', month:'', year:''};

    if(date.day < 10) {
        strDate.day = "0" + date.day;
    } else {
        strDate.day = date.day.toString();
    }

    if(date.month < 10) {
        strDate.month = "0" + date.month;
    } else {
        strDate.month = date.month.toString();
    }

    strDate.year = date.year.toString();
    return strDate;
}

function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);;
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    var dateFormats = getAllDateFormats(date);

    var flag=false;
    for(var i=0;i<dateFormats.length;i++) {
        if(isPalindrome(dateFormats[i])) {
            flag=true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if(year%400 === 0) {
        return true;
    } else if(year%100 === 0){
        return false;
    } else if(year%4 === 0){
        return true;
    }
    return false;
}

function incrementDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysinMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2) {
        if(isLeapYear(year)) {
            if(day>29) {
                day=1;
                month++;
            }
        } else {
            if(day>28) {
                day=1;
                month++;
            }
        }
    } else {
        if(day > daysinMonth[month-1]) {
            day=1;
            month++;
        }
    }

    if(month>12) {
        month=1;
        year++;
    }

    return {
        day: day,
        month:month,
        year:year
    };
}

function getNextPalindromeDate(date) {
    var count=0;
    var nextDate = incrementDate(date);

    while(1) {
        count++;
        if(checkPalindromeForAllDateFormats(nextDate)) {
            break;
        }
        nextDate = incrementDate(nextDate);
    }

    return [count, nextDate];
}

function decrementDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysinMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    
    if(day<1) {
        if(month === 1) {
            day=31;
            month=12;
            year--;
        } else if(month === 3) {
            if(isLeapYear(year)) {
                day=29;
                month--;
            } else {
                day=28;
                month--;
            }
        } else {
            day = daysinMonth[month-1-1];
            month--;
        }
        
    }

    return {
        day: day,
        month:month,
        year:year
    };
}

function getPreviousPalindromeDate(date) {
    var count = 0;
    var prevDate = decrementDate(date);

    while(1) {
        count++;
        if(checkPalindromeForAllDateFormats(prevDate)) {
            break;
        }
        prevDate = decrementDate(prevDate);
    }

    return [count, prevDate];
}


var birthDate = document.getElementById('birthDate');
var submitBtn = document.getElementById('submit-btn');
var output = document.getElementById('output');

function submitHandler() {
    var bdayStr = birthDate.value;

    if(bdayStr !== '') {
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }
        console.log(date);
        if(checkPalindromeForAllDateFormats(date)) {
            output.innerText = "Congrats !! Your Birthday is Palindrome";
        } else {
            var nextPalindrome = getNextPalindromeDate(date);
            var prevPalindrome = getPreviousPalindromeDate(date);
    
            if(nextPalindrome[0] > prevPalindrome[0]) {
                var nearestDate = prevPalindrome[1].day + "-" + prevPalindrome[1].month + "-"  +prevPalindrome[1].year;
                output.innerText = `The nearest palindrome date is ${nearestDate}, you missed by ${prevPalindrome[0]} days.`;
            } else {
                var nearestDate = nextPalindrome[1].day + "-" + nextPalindrome[1].month + "-"  + nextPalindrome[1].year;
                output.innerText = `The nearest palindrome date is ${nearestDate}, you missed by ${nextPalindrome[0]} days.`;
            }
        }
    }
  
    
}

submitBtn.addEventListener('click', submitHandler);
