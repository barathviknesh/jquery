// data table
var st = 0;
var en = $('select[name=cars] option').filter(':selected').val();
$(document).ready(function main() {
    $(info.data).each(function (i, obj) {
        // console.log(obj[0], " ", obj[1], " ", obj[2], " ", obj[3], " ", obj[4], " ", obj[5]);
        var t = "<tr>" +
            "<td>" + obj[0] + "</td>" +
            "<td>" + obj[1] + "</td>" +
            "<td>" + obj[2] + "</td>" +
            "<td>" + obj[3] + "</td>" +
            "<td>" + obj[4] + "</td>" +
            "<td>" + obj[5] + "</td>" +
            "</tr>"
        $("#tbody").append(t);

        // return i < 9;
    });

    // show entries----------------------------------------------------------(1)
    $('.select').on('change', function () {
        main();
    });

    // pagination-------------------------------------------------------------(2)
    //how much items per page to show
    var show_per_page = $('select[name=cars] option').filter(':selected').val();
    //getting the amount of elements inside content div
    // var s = $('#tbody').children().size();
    var number_of_items = info.data.length;
    //calculate the number of pages we are going to have
    var number_of_pages = Math.ceil(number_of_items / show_per_page);

    //set the value of our hidden input fields
    $('#current_page').val(0);
    $('#show_per_page').val(show_per_page);
    var cp = $('#current_page').val(0);
    //now when we got all we need for the navigation let's make it '
    // $("#current_v").html("<p>showing" + 1 + " to " + number_of_items + " of " + number_of_items + " entries</p>")
    /*
    what are we going to have in the navigation?
      - link to previous page
      - links to specific pages
      - link to next page
    */
    var navigation_html = '<a class="previous_link" href="javascript:previous();">Prev</a>';
    var current_link = 0;
    $("#current_v").html("<p>showing " + st + " to " + en + " of " + info.data.length + " entries</p>")
    while (number_of_pages > current_link) {
        navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
        current_link++;
    }
    navigation_html += '<a class="next_link" href="javascript:next();">Next</a>';

    $('#page_navigation').html(navigation_html);

    //add active_page class to the first page link
    $('#page_navigation .page_link:first').addClass('active_page');

    //hide all the elements inside content div
    $('#tbody').children().css('display', 'none').addClass('disk');

    //and show the first n (show_per_page) elements
    $('#tbody').children().slice(0, show_per_page).css('display', '');

});

// previous fun
function previous() {

    new_page = parseInt($('#current_page').val()) - 1;
    //if there is an item before the current active link run the function
    if ($('.active_page').prev('.page_link').length == true) {
        go_to_page(new_page);
    }

}
// nxt fun
function next() {
    new_page = parseInt($('#current_page').val()) + 1;
    //if there is an item after the current active link run the function
    if ($('.active_page').next('.page_link').length == true) {
        go_to_page(new_page);
    }

}
// goto page pagination
function go_to_page(page_num) {
    //get the number of items shown per page
    var show_per_page = parseInt($('#show_per_page').val());

    //get the element number where to start the slice from
    start_from = page_num * show_per_page;
    st = start_from
    console.log(start_from, "start");
    //get the element number where to end the slice
    end_on = start_from + show_per_page;
    en = end_on
    console.log(end_on, "end");
    // the current page status throuth p tag -----------------------------------------------------------------(3)
    $("#current_v").html("<p>showing " + st + " to " + en + " of " + info.data.length + " entries</p>")
    //hide all children elements of content div, get specific items and show them

    $('#tbody').children().css('display', 'none').slice(start_from, end_on).css('display', '');

    /*get the page link that has longdesc attribute of the current page and add active_page class to it
    and remove that class from previously active page link*/
    $('.page_link[longdesc=' + page_num + ']').addClass('active_page').siblings('.active_page').removeClass('active_page');

    //update the current page input field
    $('#current_page').val(page_num);
}



// search---------------------------------------------------------------------------(4)
// Search all columns
$('#txt_searchall').keyup(function () {
    // Search Text
    var search = $(this).val();

    // Hide all table tbody rows
    $('table tbody tr').hide();

    // Count total search result
    var len = $('table tbody tr:not(.notfound) td:contains("' + search + '")').length;

    if (len > 0) {
        // Searching text in columns and show match row
        $('table tbody tr:not(.notfound) td:contains("' + search + '")').each(function () {
            $(this).closest('tr').show();
        });
    } else if (len === 0) {


    }
    else {
        $('.notfound').show();
    }

});


// Case-insensitive searching (Note - remove the below script for Case sensitive search )
$.expr[":"].contains = $.expr.createPseudo(function (arg) {
    return function (elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

// sorting------------------------------------------------------------------------------(5)
$('th').click(function () {
    var table = $(this).parents('table').eq(0)
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
    this.asc = !this.asc
    if (!this.asc) { rows = rows.reverse() }
    for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
})
function comparer(index) {
    return function (a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
    }
}
function getCellValue(row, index) { return $(row).children('td').eq(index).text() }
// sorting end.

// json data.

var info = {
    data: [
        [
            "Tiger Nixon",
            "System Architect",
            "Edinburgh",
            "5421",
            "2011/04/25",
            "$320,800",
        ],
        [
            "Garrett Winters",
            "Accountant",
            "Tokyo",
            "8422",
            "2011/07/25",
            "$170,750",
        ],
        [
            "Ashton Cox",
            "Junior Technical Author",
            "San Francisco",
            "1562",
            "2009/01/12",
            "$86,000",
        ],
        [
            "Cedric Kelly",
            "Senior Javascript Developer",
            "Edinburgh",
            "6224",
            "2012/03/29",
            "$433,060",
        ],
        [
            "Airi Satou",
            "Accountant",
            "Tokyo",
            "5407",
            "2008/11/28",
            "$162,700",
        ],
        [
            "Brielle Williamson",
            "Integration Specialist",
            "New York",
            "4804",
            "2012/12/02",
            "$372,000",
        ],
        [
            "Herrod Chandler",
            "Sales Assistant",
            "San Francisco",
            "9608",
            "2012/08/06",
            "$137,500",
        ],
        [
            "Rhona Davidson",
            "Integration Specialist",
            "Tokyo",
            "6200",
            "2010/10/14",
            "$327,900",
        ],
        [
            "Colleen Hurst",
            "Javascript Developer",
            "San Francisco",
            "2360",
            "2009/09/15",
            "$205,500",
        ],
        [
            "Sonya Frost",
            "Software Engineer",
            "Edinburgh",
            "1667",
            "2008/12/13",
            "$103,600",
        ],
        [
            "Jena Gaines",
            "Office Manager",
            "London",
            "3814",
            "2008/12/19",
            "$90,560",
        ],
        [
            "Quinn Flynn",
            "Support Lead",
            "Edinburgh",
            "9497",
            "2013/03/03",
            "$342,000",
        ],
        [
            "Charde Marshall",
            "Regional Director",
            "San Francisco",
            "6741",
            "2008/10/16",
            "$470,600",
        ],
        [
            "Haley Kennedy",
            "Senior Marketing Designer",
            "London",
            "3597",
            "2012/12/18",
            "$313,500",
        ],
        [
            "Tatyana Fitzpatrick",
            "Regional Director",
            "London",
            "1965",
            "2010/03/17",
            "$385,750",
        ],
        [
            "Michael Silva",
            "Marketing Designer",
            "London",
            "1581",
            "2012/11/27",
            "$198,500",
        ],
        [
            "Paul Byrd",
            "Chief Financial Officer (CFO)",
            "New York",
            "3059",
            "2010/06/09",
            "$725,000",
        ],
        [
            "Gloria Little",
            "Systems Administrator",
            "New York",
            "1721",
            "2009/04/10",
            "$237,500",
        ],
        [
            "Bradley Greer",
            "Software Engineer",
            "London",
            "2558",
            "2012/10/13",
            "$132,000",
        ],
        [
            "Dai Rios",
            "Personnel Lead",
            "Edinburgh",
            "2290",
            "2012/09/26",
            "$217,500",
        ],
        [
            "Jenette Caldwell",
            "Development Lead",
            "New York",
            "1937",
            "2011/09/03",
            "$345,000",
        ],
        [
            "Yuri Berry",
            "Chief Marketing Officer (CMO)",
            "New York",
            "6154",
            "2009/06/25",
            "$675,000",
        ],
        [
            "Caesar Vance",
            "Pre-Sales Support",
            "New York",
            "8330",
            "2011/12/12",
            "$106,450",
        ],
        [
            "Doris Wilder",
            "Sales Assistant",
            "Sydney",
            "3023",
            "2010/09/20",
            "$85,600",
        ],
        [
            "Angelica Ramos",
            "Chief Executive Officer (CEO)",
            "London",
            "5797",
            "2009/10/09",
            "$1,200,000",
        ],
        [
            "Gavin Joyce",
            "Developer",
            "Edinburgh",
            "8822",
            "2010/12/22",
            "$92,575",
        ],
        [
            "Jennifer Chang",
            "Regional Director",
            "Singapore",
            "9239",
            "2010/11/14",
            "$357,650",
        ],
        [
            "Brenden Wagner",
            "Software Engineer",
            "San Francisco",
            "1314",
            "2011/06/07",
            "$206,850",
        ],
        [
            "Fiona Green",
            "Chief Operating Officer (COO)",
            "San Francisco",
            "2947",
            "2010/03/11",
            "$850,000",
        ],
        [
            "Shou Itou",
            "Regional Marketing",
            "Tokyo",
            "8899",
            "2011/08/14",
            "$163,000",
        ],
        [
            "Michelle House",
            "Integration Specialist",
            "Sydney",
            "2769",
            "2011/06/02",
            "$95,400",
        ],
        [
            "Suki Burks",
            "Developer",
            "London",
            "6832",
            "2009/10/22",
            "$114,500",
        ],
        [
            "Prescott Bartlett",
            "Technical Author",
            "London",
            "3606",
            "2011/05/07",
            "$145,000",
        ],
        [
            "Gavin Cortez",
            "Team Leader",
            "San Francisco",
            "2860",
            "2008/10/26",
            "$235,500",
        ],
        [
            "Martena Mccray",
            "Post-Sales support",
            "Edinburgh",
            "8240",
            "2011/03/09",
            "$324,050",
        ],
        [
            "Unity Butler",
            "Marketing Designer",
            "San Francisco",
            "5384",
            "2009/12/09",
            "$85,675",
        ],
        [
            "Howard Hatfield",
            "Office Manager",
            "San Francisco",
            "7031",
            "2008/12/16",
            "$164,500",
        ],
        [
            "Hope Fuentes",
            "Secretary",
            "San Francisco",
            "6318",
            "2010/02/12",
            "$109,850",
        ],
        [
            "Vivian Harrell",
            "Financial Controller",
            "San Francisco",
            "9422",
            "2009/02/14",
            "$452,500",
        ],
        [
            "Timothy Mooney",
            "Office Manager",
            "London",
            "7580",
            "2008/12/11",
            "$136,200",
        ],
        [
            "Jackson Bradshaw",
            "Director",
            "New York",
            "1042",
            "2008/09/26",
            "$645,750",
        ],
        [
            "Olivia Liang",
            "Support Engineer",
            "Singapore",
            "2120",
            "2011/02/03",
            "$234,500",
        ],
        [
            "Bruno Nash",
            "Software Engineer",
            "London",
            "6222",
            "2011/05/03",
            "$163,500",
        ],
        [
            "Sakura Yamamoto",
            "Support Engineer",
            "Tokyo",
            "9383",
            "2009/08/19",
            "$139,575",
        ],
        [
            "Thor Walton",
            "Developer",
            "New York",
            "8327",
            "2013/08/11",
            "$98,540",
        ],
        [
            "Finn Camacho",
            "Support Engineer",
            "San Francisco",
            "2927",
            "2009/07/07",
            "$87,500",
        ],
        [
            "Serge Baldwin",
            "Data Coordinator",
            "Singapore",
            "8352",
            "2012/04/09",
            "$138,575",
        ],
        [
            "Zenaida Frank",
            "Software Engineer",
            "New York",
            "7439",
            "2010/01/04",
            "$125,250",
        ],
        [
            "Zorita Serrano",
            "Software Engineer",
            "San Francisco",
            "4389",
            "2012/06/01",
            "$115,000",
        ],
        [
            "Jennifer Acosta",
            "Junior Javascript Developer",
            "Edinburgh",
            "3431",
            "2013/02/01",
            "$75,650",
        ],
        [
            "Cara Stevens",
            "Sales Assistant",
            "New York",
            "3990",
            "2011/12/06",
            "$145,600",
        ],
        [
            "Hermione Butler",
            "Regional Director",
            "London",
            "1016",
            "2011/03/21",
            "$356,250",
        ],
        [
            "Lael Greer",
            "Systems Administrator",
            "London",
            "6733",
            "2009/02/27",
            "$103,500",
        ],
        [
            "Jonas Alexander",
            "Developer",
            "San Francisco",
            "8196",
            "2010/07/14",
            "$86,500",
        ],
        [
            "Shad Decker",
            "Regional Director",
            "Edinburgh",
            "6373",
            "2008/11/13",
            "$183,000",
        ],
        [
            "Michael Bruce",
            "Javascript Developer",
            "Singapore",
            "5384",
            "2011/06/27",
            "$183,000",
        ],
        [
            "Donna Snider",
            "Customer Support",
            "New York",
            "4226",
            "2011/01/25",
            "$112,000",
        ],
    ],
};

    // data ends here.


