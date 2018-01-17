$.ajax({
    type: 'GET',
    url: '../js/data.json',
    success: function(data) {
        // console.log(data);
        if (data) {
            var len = data.length;
            var txt = "";
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    if (data) {
                        txt += `<tr id='${i}'>
                        <td class="username">${data[i].username}</td>
                        <td class="age">${data[i].age }</td>
                        <td class="name1">${data[i].name}</td>
                        <td class="gender">${data[i].gender}</td>
                        <td class="company">${data[i].company}</td>
                        <td class="phone">${data[i].phone}</td>
                        <td class="view_delete"><button class='view btn btn-success'>View Details</button><button class='delete btn btn-danger'>Delete</button></td></tr>`;
                    }
                }
                if (txt != "") {
                    $("#table1").append(txt);
                }

                //View Details Function
                $('.view').click(function(e) {
                    var trId = e.target.parentNode.parentNode.id;
                    var detailString = "<tr id='" + trId + "viewBlock'><td colspan=8>"
                    for (const key in data[trId]) {
                        if (data[trId].hasOwnProperty(key)) {
                            if (key !== 'friends') {
                                detailString += `<p><strong>${key.toUpperCase()}</strong> : ${data[trId][key]}</p>`;
                            }
                            if (key === 'friends') {
                                detailString += `<p><strong>FRIENDS</strong></p>`
                                for (var k = 0; k < data[trId][key].length; k++) {
                                    for (const key1 in data[trId][key][k]) {
                                        detailString += `<p><strong>${key1}</strong> : ${data[trId][key][k][key1]}</p>`;
                                    }
                                }
                            }
                        }
                    }
                    detailString += "</td></tr>";
                    // console.log(JSON.stringify(data[trId]));
                    document.getElementById(trId).insertAdjacentHTML("afterend", detailString);
                });

                //Delete Row function
                $("#table1").on('click', '.delete', function(e) {
                    var ID = e.target.parentNode.parentNode.id;
                    document.getElementById(ID).remove();

                    if (document.getElementById(ID + "viewBlock")) {
                        document.getElementById(ID + "viewBlock").remove();
                    }
                });

                //Hide/Show column on checking checkbox
                $("input:checkbox:not(:checked)").each(function() {
                    var column = "table ." + $(this).attr("name");
                    $(column).hide();
                });
                $("input:checkbox").click(function() {
                    var column = "table ." + $(this).attr("name");
                    $(column).toggle();
                });

                //
                $('#txtInp').keyup(function() {
                    var value = $(this).val();
                    // console.log(value);
                    $('table tr').hide();
                    $('table tr td:contains("' + value + '")').each(function(index) {
                        $(this).closest('tr').show();
                    });
                    $.expr[":"].contains = $.expr.createPseudo(function(arg) {
                        return function(elem) {
                            return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
                        };
                    });
                });

            }

        }
    }
});
