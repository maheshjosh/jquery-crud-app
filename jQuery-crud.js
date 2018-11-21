
$(document).ready(function () {
	var url = "http://localhost:3000/posts";

	//GET method			
	$.ajax({
		type: "GET",
		url: url,
		success: function (data) {
			var trHTML = '';
			$.each(data, function (key, value) {
				trHTML +=
					'<tr id = "' + value.id + '"><td>' + value.id +
					'</td><td>' + value.userId +
					'</td><td>' + value.title +
					'</td><td>' + value.body +
					'</td><td><button class="btn btn-danger mb-2 py-0 remove">Delete</button>' + "<br>" +
					'<button class="btn btn-success mb-2 py-0 edit" data-toggle="modal" data-target="#myModal">Edit</button>' +
					'</td></tr>';
			});
			$('tbody').append(trHTML);

		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert("Status: " + textStatus); alert("Error: " + errorThrown);
		}
	});

	//POST method
	$("#myForm").on('click', '#submit', function (event) {
		event.preventDefault();
		var id = $('#id').val();
		var apiUrl = url;
		var httpMethod = "POST";
		var formData = {
			'userId': $('#userId').val(), //for get userId 
			'title': $('#title').val(), //for get title 
			'body': $('#body').val() //for get body       
		};
		if (id && id !== undefined) {
			apiUrl = url + "/" + id;
			httpMethod = "PUT";
			formData.id = id;
		}
		$.ajax({
			type: httpMethod,
			url: apiUrl,
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(formData),
			success: function (response) {
				console.log(response);
				var tdHTML = '<td>' + response.id +
					'</td><td>' + response.userId +
					'</td><td>' + response.title +
					'</td><td>' + response.body +
					'</td><td><button class="btn btn-danger mb-2 py-0 remove">Delete</button>' + "<br>" +
					'<button class="btn btn-success mb-2 py-0 edit" data-toggle="modal" data-target="#myModal">Edit</button>' +
					'</td>';

				if (id && id !== undefined) {
					$('tr#' + id).html(tdHTML);
					alert("Record updated successfuly");
				} else {
					var trHTML = '<tr id = "' + response.id + '">' + tdHTML + '</tr>';
					$('tbody').append(trHTML);
					alert("Record created successfuly");
				}
				$("#myForm").trigger("reset");
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("Status: " + textStatus); alert("Error: " + errorThrown);
			}
		});
	});

	//DELETE mothod
	$(document).on('click', '.remove', function () {
		var trElement = $(this).parent().parent();
		var deleteUrl = url + "/" + trElement.attr("id");

		$.ajax({
			type: "DELETE",
			url: deleteUrl,
			success: function (data) {
				trElement.remove();
				alert("Successfuly deleted the record");
			}
		});
	});

	//UPDATE method
	$(document).on('click', '.edit', function () {
		var trElement = $(this).parent().parent();
		var getUrl = url + "/" + trElement.attr("id");

		$.ajax({
			type: "GET",
			url: getUrl,
			success: function (response) {
				$('#id').val(response.id);
				$('#userId').val(response.userId);
				$('#title').val(response.title);
				$('#body').val(response.body);
			}
		});
	});

});