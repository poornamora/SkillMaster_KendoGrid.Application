
Globalvariables = {
    Grid: "#grid",
    modalclass: '.modal',
    AddModal: "#addModal",
    Gridbutton: "#gridbutton",
    Skillname: "#inputskillname",
    NumberofEmployees: "#inputNumberofEmployees",
    Rateperhour: "#inputRatePerHour",
    Remark: "#inputRemark",
    IsActivecheckbox: "#IsActiveCheckbox",
    Numberofemployeeserror:"#NumberofEmployeeserror",
    Numberofemployeesicon: "#NumberofEmployeesicon",
    skillerror: "#skillerror",
    skillicon:"#skillicon",
    btnsubmit: "#submit",
    Heading: ".heading",
    Numbericontext: "#Numbericontxt",
    dangeralert: '.dangeralert',    
    skillicontext:"#skillicontxt",
    cancel: "#cancel",
    closebtn: "#closebtn",
    Refrehiconbtn: "#Refreshbutton",
    dropdownlist: "#dropdownlist",
    Addpopbtn: "#addButton",
    MasterIdhiddenfield: "#MasterskillId",
    spanisActive: '#spanisActive',
    curddropdown: ".curddropdown",
    Mode: "#modeid",
    basaddress: "#baseaddress",
    alertclass: ".alert",
    binbutton: "#binbutton",
    Editbutton:"#editbutton",
    warningalert: "#warningalert",
    successalert: "#successalert",
    formsubmit: '#Formsubmit',
    formupdate: '#Formupdate',
    ExistsName: "#ExistsNameId",
    ExistsNameIcon: "#ExistNameIcon",
    formdelete: "#formdelete",
    popEditicon: ".edit",
    popDeleteicon: '.Delete',
    ViewIcon:'.View'
}
$(document).ready(function () {
    var jq = $.noConflict();
    var mode = $(Globalvariables.Mode).val();
    var hostname = $(Globalvariables.basaddress).attr("data");
    console.log(hostname);
    isvalid = true;
    var selectedSkillId = null;
    $(Globalvariables.alertclass).hide();
    var columnNameforfilter;
    

   

    //Submit View Delete
    $(document).on("click", Globalvariables.btnsubmit, function () {
        buttonvalue = $(Globalvariables.btnsubmit).attr("value");
        console.log(buttonvalue);
        var skillname = $(Globalvariables.Skillname).val();
        console.log(skillname);

        var regex_name = /^(?! )[a-zA-Z]+$/;
        if (skillname == '') {
            $(Globalvariables.skillerror).text('Please provide a Skill Name').show();
            $(Globalvariables.skillicon).show();
            $(Globalvariables.skillicontext).show();
            $(Globalvariables.dangeralert).show();
            isvalid = false;
        }
        else if (!regex_name.test(skillname)) {
            $(Globalvariables.skillerror).text('Please provide a alphabetics only').show();
            $(Globalvariables.skillicon).show();
            $(Globalvariables.skillicontext).show();
            $(Globalvariables.dangeralert).show();
            isvalid = false;
        }


        //Number of Employees validations
        var NumberofEmployees = $(Globalvariables.NumberofEmployees).val();
        var regex_name = /^(?! )[0-9]+$/;
        if (NumberofEmployees == '') {
            $(Globalvariables.Numberofemployeeserror).text('Please provide a Number of Employees').show();
            $(Globalvariables.Numberofemployeesicon).show();
            $(Globalvariables.dangeralert).show();
            $(Globalvariables.Numbericontext).show();
            isvalid = false;
        }
        else if (!regex_name.test(NumberofEmployees)) {
            $(Globalvariables.Numberofemployeeserror).show();
            $(Globalvariables.Numberofemployeesicon).show();
            $(Globalvariables.Numbericontext).show();
            $(Globalvariables.dangeralert).show();
            isvalid = false;
        }

        var IsActive = true;
        if ($(Globalvariables.IsActivecheckbox).prop('checked')) {
            IsActive = true;
        }
        else {
            IsActive = false;
        }
             
        var UpdatedMasterData = {
            SkillName: $(Globalvariables.Skillname).val(),
            NumberofEmployees: $(Globalvariables.NumberofEmployees).val(),
            RatePerHour: $(Globalvariables.Rateperhour).val(),
            Remark: $(Globalvariables.Remark).val(),
            IsActive: IsActive
        }

        //Submit Update Delete View
        if (isvalid) {
            var id = parseInt($(Globalvariables.MasterIdhiddenfield).val(), 0);
            if (buttonvalue == "Save") {
                $.ajax({
                    url: hostname + '/api/MasterForm/SubmitDetails',
                    type: 'POST',
                    data: UpdatedMasterData,
                    success: function (response) {

                        if (response) {

                            $(Globalvariables.AddModal).modal('close');
                            $('.submitcustomizedalert').fadeIn();
                            setTimeout(function () {
                                $('.submitcustomizedalert').fadeOut(); 
                            }, 3000);

                            Listajaxcall();
                        }
                    },
                    error: function (xhr) {
                        if (xhr.status === 409) {
                            $(Globalvariables.AddModal).modal('close');
                            $('.strongclass').text('Warning!');
                            $('.strongclass').css('color', '#923a00');
                            $('.submitcustomizedalert').css('background-color', '#ff9a57');
                            $('#errormsg').text('SkillName already exists in the database');
                            $('.submitcustomizedalert').fadeIn();

                            setTimeout(function () {
                                $('.submitcustomizedalert').fadeOut();
                            }, 4000);

                        } else {
                            alert('error occured while passing the data:');
                        }
                    }
                });
            }
            else if (buttonvalue == "update") {

                $.ajax({
                    url: hostname + '/api/MasterForm/UpdateDetails/' + id,
                    type: 'PUT',
                    data: { id: id, skillMasterModel: UpdatedMasterData },

                    success: function (response) {
                        $(Globalvariables.AddModal).modal('close');
                        $('.strongclass').text('Success!');
                        $('#errormsg').text('selected Skill is Updated successfully');
                        $('.submitcustomizedalert').fadeIn(); 
                        setTimeout(function () {
                            $('.submitcustomizedalert').fadeOut(); 
                        }, 3000);
                            
                        Listajaxcall();
                    },
                    error: function (xhr, status, error) {
                        alert('Error occured retrieve the data');
                        console.error("Ajax error:", status, error);
                    }
                });
            }
            else {
                $.ajax({
                    url: hostname + '/api/MasterForm/DeleteDetails/' + id,
                    type: 'DELETE',
                    data: { id: selectedSkillId },
                    success: function (response) {
                        console.log(response);
                        if (response != null) {
                            $(Globalvariables.AddModal).modal('close');
                            $('#errormsg').text('selected Skill is Deleted successfully');
                            $('.submitcustomizedalert').fadeIn();

                            setTimeout(function () {
                                $('.submitcustomizedalert').fadeOut();
                            }, 3000);
                            Listajaxcall();
                        }
                    },
                    error: function () {
                        console.log("Error Occurred");
                        alert('Error Occured while fetching the data');
                    }
                });
            }
        }
    });

       
    //SkillName Textbox input event
    $(Globalvariables.Skillname).on("input", function () {
        var skillname = $(Globalvariables.Skillname).val();
        console.log(skillname);

        var regex_name = /^(?! )[a-zA-Z]+$/;
        if (skillname == '') {

            $(Globalvariables.skillerror).text('Please provide a Skill Name').show();
            $(Globalvariables.skillicon).show();
            $(Globalvariables.skillicontext).show();
            $(Globalvariables.dangeralert).show();
               
            isvalid = false;
            return false;
        }
        else if (!regex_name.test(skillname)) {
            $(Globalvariables.skillerror).text('Please valid provide a Skill Name').show();
            $(Globalvariables.skillicon).show();
            $(Globalvariables.skillicontext).show();
            $(Globalvariables.dangeralert).show();
            isvalid = false;
            return false;
        }
        else {
            $(Globalvariables.skillerror).text('Please provide a Skill Name').hide();
            $(Globalvariables.skillicon).hide();
            $(Globalvariables.skillicontext).hide();

            if (isvalid) {
                $(Globalvariables.dangeralert).hide();
            }
            isvalid = true;
            return true;
        }

    });

    //Number of Employees input event
    $(Globalvariables.NumberofEmployees).on("input", function () {
        var regex_name = /^(?! )[0-9]+$/;
        var Employees = $(Globalvariables.NumberofEmployees).val();
        if (Employees == '') {
            $(Globalvariables.Numberofemployeeserror).text('Please provide a Number of Employees').show();
            $(Globalvariables.Numberofemployeesicon).show();
            $(Globalvariables.Numbericontext).show();
            $(Globalvariables.dangeralert).show();
            isvalid = false;
            return false;
        }
        else if (!regex_name.test(Employees)) {
            $(Globalvariables.Numberofemployeeserror).text('Please provide a Integer only').show();
            $(Globalvariables.Numberofemployeesicon).show();
            $(Globalvariables.Numbericontext).show();
            $(Globalvariables.dangeralert).show();
            isvalid = false;
            return false;
        }
        else {
            $(Globalvariables.Numberofemployeeserror).hide();
            $(Globalvariables.Numberofemployeesicon).hide();
            $(Globalvariables.Numbericontext).hide();
            if (isvalid) {
                $(Globalvariables.dangeralert).hide();
            }
            isvalid = true;
            return true;
        }
    });
        
    Listajaxcall();

    function Listajaxcall() {
        $.ajax({
            url: hostname + '/api/MasterForm/ListDetails',
            type: 'GET',
            success: function (response) {
                console.log(response);
                KendbindData(response);
            },
            error: function (xhr, status, error) {
                alert('Error occured retrieve the data');
                console.error("Ajax error:", status, error);
            }
        });
    }

    function KendbindData(listapidata) {

        var dataSource = new kendo.data.DataSource({
            data: listapidata,
            pageSize: 15
        });

        var griddata=$(Globalvariables.Grid).kendoGrid({

            dataSource: dataSource,
            height: 500,
            width: 1491,
            Scrollable: true,
            sortable: true,
            filterable:true,
            pageable: true,
            columnMenu: true,
            autoSync: true,
            resizable: {columns: true },

            columns: [{
                selectable: true,
                width: 50,
                    attributes: {
                        "class": "checkbox-align",
                    },
                    headerAttributes: {
                        "class": "checkbox-align",
                    }
                },
                { field: "skillName", width: "100px", title: "Skill Name"},
                { field: "numberofEmployees", width: "100px", title: "Number of Employees"},
                { field: "ratePerHour", width: "100px", title: "Rate Per Hour"},
                { field: "remark", width: "100px", title: "Remarks"},
                { field: "isActive", width: "100px", title: "IsActive"},
                { title: "Action", width: "100px", template: processData}
            ],
            selectable: "multiple row",
                
            change: function (e) {
                var grid = $(Globalvariables.Grid).data("kendoGrid");
                var selectedRows = this.select();
                var selectedSkillIds = [];
                    
                selectedRows.each(function (index, row) {
                    var dataItem = grid.dataItem(row);
                    selectedSkillIds.push(dataItem.skillId);
                    selectedSkillId = dataItem.skillId;
                });

                if (selectedSkillIds.length > 0) {
                    $(Globalvariables.MasterIdhiddenfield).attr("value", selectedSkillIds.join(', '));
                    $('.disableicons').css('opacity', 1);
                    $('.disableicons').css('pointer-events', 'auto');
                } else {
                    $(Globalvariables.MasterIdhiddenfield).attr("value", "");
                    $('.disableicons').css('opacity', 0.5);
                    $('.disableicons').css('pointer-events', 'none');
                }
                

                //var selectedRows = this.select();
                //var dataItem;
                //selectedRows.each(function (index, row) { 
                //    dataItem = $(Globalvariables.Grid).data("kendoGrid").dataItem(row);
                //    selectedSkillId = dataItem.skillId;
                //    $(Globalvariables.MasterIdhiddenfield).attr("value", selectedSkillId);
                //    // break out of the loop after the first selected item    
                    
                //});



                //if (dataItem) {
                //    $('.disableicons').css('opacity', 1);
                //    $('.disableicons').css('pointer-events', 'auto');
                //}
                //else {
                //    $('.disableicons').css('opacity', 0.5);
                //}
            },
                 
            dataBound: function ()
            {
                $(Globalvariables.Addpopbtn).on("click", function () {
                    $(Globalvariables.Skillname).prop('disabled', false);
                    $(Globalvariables.NumberofEmployees).prop('disabled', false);
                    $(Globalvariables.Rateperhour).prop('disabled', false);
                    $(Globalvariables.Remark).prop('disabled', false);
                    $(Globalvariables.IsActivecheckbox).val('').prop('disabled', false),
                    $(Globalvariables.IsActivecheckbox).prop('checked', true),

                    $(Globalvariables.Heading).text("Skill : Add");
                    $(Globalvariables.btnsubmit).val("Save");
                    $(Globalvariables.spanisActive).hide();
                    $(Globalvariables.modalclass).modal();
                    $(Globalvariables.AddModal).modal('open');
                    $(Globalvariables.btnsubmit).show();
                    $(Globalvariables.Skillname).focus();
                });

                $('#editbutton').on('click', function () {
                    $(Globalvariables.Skillname).prop('disabled', false);
                    $(Globalvariables.NumberofEmployees).prop('disabled', false);
                    $(Globalvariables.Rateperhour).prop('disabled', false);
                    $(Globalvariables.Remark).prop('disabled', false);
                    $(Globalvariables.IsActivecheckbox).prop('disabled',false)
                    

                    $(Globalvariables.btnsubmit).val('Update');
                    $(Globalvariables.btnsubmit).show();
                });

                RefreshDatafunc();
                //Referesh Event
                function RefreshDatafunc()
                {
                    $(Globalvariables.Refrehiconbtn).on("click", function () {
                        Listajaxcall();
                        $(Globalvariables.Grid).data('kendoGrid').refresh();
                        $(Globalvariables.Heading).text("Skill : Add");
                        $(Globalvariables.warningalert).hide();
                        $(Globalvariables.skillicontext).hide();
                        $(Globalvariables.Numbericontext).hide();
                        $(Globalvariables.dangeralert).hide();
                        $(Globalvariables.modalclass).modal('close');

                        $(Globalvariables.Skillname).val('').prop('disabled',false);
                        $(Globalvariables.NumberofEmployees).val('').prop('disabled', false);
                        $(Globalvariables.Rateperhour).val('').prop('disabled', false);
                        $(Globalvariables.Remark).val('').prop('disabled', true);
                        $(Globalvariables.IsActive).prop('checked', false);
                    });
                }

                    

                $('#ExportAll').on("click", function () {

                    var finaljsonData = [];
                    var grid = $("#grid").data("kendoGrid");
                    var data = grid.dataSource.data();
                    console.log(grid);
                    console.log(data);

                    data.forEach(function (item) {
                        finaljsonData.push({
                            "Skill Name": item.skillName,
                            "Number Of Employees": item.numberofEmployees,
                            "Rate Per Hour": item.ratePerHour,
                            "Remarks": item.remark,
                            "Is Active": item.isActive
                        });
                    });

                    var worksheet = XLSX.utils.json_to_sheet(finaljsonData);

                    console.log('json to sheet ',worksheet);
                    //create new workbook
                    var workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, "SkillMaster");

                    //Export the workbook
                    XLSX.writeFile(workbook, 'SkillMaster.xlsx');

                });

                $('#ExportSelected').on("click", function () {

                    var selectedRows = $(Globalvariables.Grid).data("kendoGrid").select();
                    var selectedSkillIds = selectedRows.map(function (index, element) {
                        return $(Globalvariables.Grid).data("kendoGrid").dataItem(element).skillId;
                    }).toArray();


                    if (selectedSkillIds == null || selectedSkillIds.length < 1) {
                        $('.strongclass').text('Warning!');
                        $('.submitcustomizedalert').css('background-color', '#ffdddd');
                        $('#errormsg').text('Please select the Record and download');
                        $('.submitcustomizedalert').fadeIn();
                        setTimeout(function () {
                            $('.submitcustomizedalert').fadeOut();
                            $(Globalvariables.modalclass).hide();
                        }, 4000);
                        return false;
                    }


                    var Idstorearray = [];
                    if (selectedSkillIds.length >= 1) {
                        selectedSkillIds.forEach(function (id) {
                            Idstorearray.push(id);
                        });
                    }

                    // filtering multiple skilld's 
                    var filteredData = dataSource.data().filter(function (item) {
                        return Idstorearray.includes(item.skillId); 
                    })


                    var finaljsonData = [];
                    filteredData.forEach(function (item) {
                        finaljsonData.push({
                            "Skill Name": item.skillName,
                            "Number Of Employees": item.numberofEmployees,
                            "Rate Per Hour": item.ratePerHour,
                            "Remarks": item.remark,
                            "Is Active": item.isActive
                        });
                    });

                    var worksheet = XLSX.utils.json_to_sheet(finaljsonData);

                    console.log('json to sheet ', worksheet);
                    //create new workbook
                    var workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, "SkillMaster");

                    //Export the workbook
                    XLSX.writeFile(workbook, 'SkillMaster.xlsx');
                });
                    
            }
        }).data("kendoGrid");

        //search functionality
        $(document).on("input", '#searchinput', function () {
            var searchText = $(this).val().toLowerCase();
            if (griddata && griddata.dataSource) {
                griddata.dataSource.filter({
                    logic: "or",
                    filters: [
                        {
                            logic: "or",
                            filters: [
                                { field: "skillName", operator: "contains", value: searchText },
                                { field: "numberofEmployees", operator: "contains", value: searchText },
                                { field: "ratePerHour", operator: "contains", value: searchText },
                                { field: "remark", operator: "contains", value: searchText },
                                { field: "isActive", operator: "contains", value: searchText }
                            ]
                        }
                    ]
                });
            }
        });
    }
       
    
    //pop List for curd operation
    function processData(data) {   
        var menuHTML = `
        <div class="record">
            <span class="material-icons material-symbols-outlined curddropdown">more_vert</span>
            <div class="menu-box" style="display: none;" id='${data.skillId}'>  
                <ul>`
                menuHTML+=`
                    <li>
                        <a href="#" getEditId=${data.skillId} class="edit-link edit cursorcolor" ><span class="material-symbols-outlined">edit</span><b class='edittext'>Edit</b></a>
                    </li>
                    `
                menuHTML +=`
                    <li>
                        <a href="#" getViewId="${data.skillId}" class="view-link View cursorcolor"><span class="material-symbols-outlined">grid_on</span><b class='Viewtext'>View</b></a>
                    </li>
                    `
                menuHTML += `
                    <li>
                        <a href="#" getDeleteId=${data.skillId} class="delete-link Delete cursorcolor"><span class="material-symbols-outlined">delete</span><b class='deletetext'>Delete</b></a>
                    </li>
                    `
                menuHTML +=`
                </ul
            </div>
        </div>`;

        return menuHTML;
    }


    var skillid;
    //binding data for Edit using ajax
    $(document).on("click", Globalvariables.popEditicon, function (e) {
        e.preventDefault();
        skillid = parseInt($(this).attr('getEditId'), 0);
        if (skillid > 0 && skillid == null) {
            $('.strongclass').css('color', 'red');
            $('.strongclass').text('Error!');
            $('.submitcustomizedalert').css('background-color', '#ffdddd');
            $('#errormsg').text('Please select one skill to Edit');
            $('.submitcustomizedalert').fadeIn();
            setTimeout(function () {
                $('.submitcustomizedalert').fadeOut();
            }, 2000);
        }

        $(Globalvariables.Heading).text("Skill : Edit");
        $(Globalvariables.btnsubmit).attr("value","update");
        $.ajax({
            url: hostname + '/api/MasterForm/Getexistingdetails/' + skillid,
            type: 'GET',
            success: function (response) {
                console.log(response);

                $(Globalvariables.Skillname).val(response.skillName).prop('disabled', true);
                $(Globalvariables.NumberofEmployees).val(response.numberofEmployees),
                $(Globalvariables.Rateperhour).val(response.ratePerHour),
                $(Globalvariables.Remark).val(response.remark),
                $(Globalvariables.IsActivecheckbox).prop('checked', response.isActive);
                $(Globalvariables.modalclass).modal();
                $(Globalvariables.AddModal).modal('open');
                $(Globalvariables.NumberofEmployees).focus();
            },
            error: function (xhr, status, error) {
                alert('Error occured retrieve the data');
                console.error("Ajax error:", status, error);
            }
        });
    });

    //binding data for Delete using ajax
    $(document).on('click', Globalvariables.popDeleteicon, function (e) {
        e.preventDefault();
        skillid = parseInt($(this).attr('getDeleteId'), 0);
        if (skillid == null && skillid >= 1) {
            $('.strongclass').css('color', 'red');
            $('.strongclass').text('Error!');
            $('.submitcustomizedalert').css('background-color', '#ffdddd');
            $('#errormsg').text('Please select one skill to Delete');
            $('.submitcustomizedalert').fadeIn();

            setTimeout(function () {
                $('.submitcustomizedalert').fadeOut();
            }, 4000);
            return false;
        }

        $(Globalvariables.Heading).text("Skill : Delete");
        $(Globalvariables.btnsubmit).attr("value", "Delete");
            
        $.ajax({
            url: hostname + '/api/MasterForm/DeleteDetails/' + skillid,
            type: 'DELETE',
            data: { id: skillid },
            success: function (response) {
                console.log(response);
                if (response != null) {
                    $('#errormsg').text('selected Skill is Deleted successfully');
                    $('.submitcustomizedalert').fadeIn();

                    setTimeout(function () {
                        $('.submitcustomizedalert').fadeOut();
                    }, 4000);

                    Listajaxcall();
                }
            },
            error: function () {
                console.log("Error Occurred");
                alert('Error Occured while fetching the data');
            }
        });

    });

    //binding data for View using ajax
    $(document).on('click', Globalvariables.ViewIcon, function (e) {
        
        e.preventDefault();
        skillid = parseInt($(this).attr('getViewId'), 0);
        $(Globalvariables.Heading).text("Skill : View");
        $(Globalvariables.btnsubmit).hide();
            
        $.ajax({
            url: hostname + '/api/MasterForm/Getexistingdetails/' + skillid,
            type: 'GET',
            success: function (response) {
                console.log(response);

                if (response.isActive == true) {
                    $('#IsActiveCheckbox').prop('checked', true);
                }
                $(Globalvariables.IsActivecheckbox).prop('disabled', true);
                $(Globalvariables.Skillname).val(response.skillName).prop('disabled', true);
                $(Globalvariables.NumberofEmployees).val(response.numberofEmployees).prop('disabled', true),
                $(Globalvariables.Rateperhour).val(response.ratePerHour).prop('disabled', true),
                $(Globalvariables.Remark).val(response.remark).prop('disabled', true),


                $(Globalvariables.modalclass).modal();
                $(Globalvariables.AddModal).modal('open');
            },
            error: function (xhr, status, error) {
                alert('Error occured retrieve the data');
                console.error("Ajax error:", status, error);
            }
        });


    });
       
    //Toggle bar for more_vert icon
    $(document).on('click', Globalvariables.curddropdown, function (e) {

        var menuBox = $(this).next('.menu-box');

        // Hide all other menu-box elements except the one to be shown
        $('.menu-box').not(menuBox).hide()

        // Toggle the visibility of the current menu-box
        menuBox.toggle();

    });

    //Editbutton ajax call
    $(document).on("click", Globalvariables.Editbutton, function (e) {

        e.preventDefault();

        $('#IsActiveCheckbox').show();
        $(Globalvariables.Heading).text("Skill : Edit");
           
        //Retrieve selected rows
        var selectedRows = $(Globalvariables.Grid).data("kendoGrid").select();
        var selectedSkillIds = selectedRows.map(function (index, element) {
            return $(Globalvariables.Grid).data("kendoGrid").dataItem(element).skillId;
        }).toArray();


        if (selectedSkillIds.length > 1) {
            $('.strongclass').css('color', 'red');
            $('.strongclass').text('Error!');
            $('.submitcustomizedalert').css('background-color', '#ffdddd');
            $('#errormsg').text('Please select one skill only to Edit');
            $('.submitcustomizedalert').fadeIn();

            setTimeout(function () {
                $('.submitcustomizedalert').fadeOut();
            }, 4000);
            $(Globalvariables.modalclass).hide();
            Listajaxcall();
            return false;
        }


        if (selectedSkillIds == null || selectedSkillIds.length < 1) {
            $('.strongclass').text('Error!');
            $('.submitcustomizedalert').css('background-color', '#ffdddd');
            $('#errormsg').text('Please select one skill to Delete');
            $('.submitcustomizedalert').fadeIn();

            setTimeout(function () {
                $('.submitcustomizedalert').fadeOut();
            }, 4000);
            Listajaxcall();
            return false;
        }
        console.log(selectedSkillId);

        $(Globalvariables.btnsubmit).attr("value", "update");
        // Send selected skill IDs to the server for deletion
        $.ajax({
            url: hostname + '/api/MasterForm/Getexistingdetails/' + selectedSkillId,
            type: 'GET',
            success: function (response) {

                $(Globalvariables.Skillname).val(response.skillName).prop('disabled', true);
                $(Globalvariables.NumberofEmployees).val(response.numberofEmployees),
                $(Globalvariables.Rateperhour).val(response.ratePerHour),
                $(Globalvariables.Remark).val(response.remark),
                $(Globalvariables.IsActivecheckbox).prop('checked', response.isActive);
                $(Globalvariables.modalclass).modal();
                $(Globalvariables.AddModal).modal('open');
                $(Globalvariables.NumberofEmployees).focus();
            },
            error: function (xhr, status, error) {
                alert('Error occurred while fetching existing details');
                console.error("Ajax error:", status, error);
            }
        });

            
    });

    //binbutton ajax call
    $(document).on("click", Globalvariables.binbutton, function (e) {

        e.preventDefault();

        $(Globalvariables.IsActivecheckbox).hide();
        $(Globalvariables.Heading).text("Skill : Delete");

        var selectedRows = $(Globalvariables.Grid).data("kendoGrid").select();
        var selectedSkillIds = selectedRows.map(function (index, element) {
            return $(Globalvariables.Grid).data("kendoGrid").dataItem(element).skillId;
        }).toArray();

        if (selectedSkillIds.length > 1) {
            $('.strongclass').css('color', 'red');
            $('.strongclass').text('Error!');
            $('.submitcustomizedalert').css('background-color', '#ffdddd');
            $('#errormsg').text('Please select one skill only to Delete');
            $('.submitcustomizedalert').fadeIn();

            setTimeout(function () {
                $('.submitcustomizedalert').fadeOut();
            }, 4000);
            Listajaxcall();
            return false;
        }


        if (selectedSkillIds == null || selectedSkillIds.length < 1) {
            $('.strongclass').css('color', 'red');
            $('.strongclass').text('Error!');
            $('.submitcustomizedalert').css('background-color', '#ffdddd');
            $('#errormsg').text('Please select one skill to Delete');
            $('.submitcustomizedalert').fadeIn();
            setTimeout(function () {
                $('.submitcustomizedalert').fadeOut();
                $(Globalvariables.modalclass).hide();
            }, 4000);
            return false;
        }

        $('#DeletemodalId').modal();    
        $('#DeletemodalId').modal('open');

        $('#Deleteconfirmbtn').on('click', function () {
            $.ajax({
                url: hostname + '/api/MasterForm/DeleteDetails/' + selectedSkillId,
                type: 'DELETE',
                data: { id: selectedSkillId },
                success: function (response) {
                    console.log(response);
                    if (response != null) {
                        $('#errormsg').text('selected Skill is Deleted successfully');
                        $('.submitcustomizedalert').fadeIn();

                        setTimeout(function () {
                            $('.submitcustomizedalert').fadeOut();
                        }, 4000);

                        Listajaxcall();
                    }
                },
                error: function () {
                    console.log("Error Occurred");
                    alert('Error Occured while fetching the data');
                }
            });
        });
    });

    //gridbutton ajax call
    $(document).on("click", Globalvariables.Gridbutton, function (e) {

        e.preventDefault();
        $(Globalvariables.Heading).text("Skill : View");
        $(Globalvariables.btnsubmit).hide();



        var selectedRows = $(Globalvariables.Grid).data("kendoGrid").select();
        var selectedSkillIds = selectedRows.map(function (index, element) {
            return $(Globalvariables.Grid).data("kendoGrid").dataItem(element).skillId;
        }).toArray();

        if (selectedSkillIds.length > 1) {
            $('.strongclass').text('Error!');
            $('.strongclass').css('color','red');
            $('.submitcustomizedalert').css('background-color', '#ffdddd');
            $('#errormsg').text('Please select one skill only to View');
            $('.submitcustomizedalert').fadeIn();

            setTimeout(function () {
                $('.submitcustomizedalert').fadeOut();
            }, 4000);

            $(Globalvariables.modalclass).hide();
            Listajaxcall();
            return false;
        }


        if (selectedSkillIds == null || selectedSkillIds.length < 1) {
            $('.strongclass').text('Error!');
            $('.submitcustomizedalert').css('background-color', '#ffdddd');
            $('#errormsg').text('Please select one skill to View');
            $('.submitcustomizedalert').fadeIn();

            setTimeout(function () {
                $('.submitcustomizedalert').fadeOut();
            }, 4000);
            Listajaxcall();
            return false;
        }

        // Send selected skill IDs to the server for deletion
        $.ajax({
            url: hostname + '/api/MasterForm/Getexistingdetails/' + selectedSkillId,
            type: 'GET',
            success: function (response) {
                console.log(response);

                if (response.isActive == true) {
                    $('#IsActiveCheckbox').prop('checked', true);
                }
                $(Globalvariables.IsActivecheckbox).prop('disabled', true);
                $(Globalvariables.Skillname).val(response.skillName).prop('disabled', true);
                $(Globalvariables.NumberofEmployees).val(response.numberofEmployees).prop('disabled',true),
                $(Globalvariables.Rateperhour).val(response.ratePerHour).prop('disabled',true),
                $(Globalvariables.Remark).val(response.remark).prop('disabled',true),
                $(Globalvariables.modalclass).modal();
                $(Globalvariables.AddModal).modal('open');

            },
            error: function (xhr, status, error) {
                alert('Error occurred while fetching existing details');
                console.error("Ajax error:", status, error);
            }
        });
    });

    function dataReload() {
        $(Globalvariables.warningalert).hide();
        $(Globalvariables.skillicontext).hide();
        $(Globalvariables.Numbericontext).hide();
        $(Globalvariables.dangeralert).hide();
        $(Globalvariables.modalclass).modal('close');
        $(Globalvariables.Skillname).val('');
        $(Globalvariables.NumberofEmployees).val('');
        $(Globalvariables.Rateperhour).val('');
        $(Globalvariables.Remark).val('');
        $(Globalvariables.IsActive).prop('checked', false);
        $(Globalvariables.successalert).hide();
        $(Globalvariables.formsubmit).hide();
        Listajaxcall();
        Listajaxcall();
    }
       
    $(Globalvariables.cancel).on("click", function () {
        dataReload();
        RefreshDatafunc();
    });

    $(Globalvariables.closebtn).on("click", function () {
        dataReload();
        RefreshDatafunc();
    });


    $('.closebtn').on("click", function () {
        $('.submitcustomizedalert').hide();
    });

    $('#exportbuttoncontainer').on("click", function () {
        $('#export_pop').toggle();
    });


    $('.k-i-filter').hide();



    //filteration container hide logic
    $('body').on('click',function () {
        $('#morevert-container').hide();
        $('.menu-box').hide();     
    });


  

 
});



