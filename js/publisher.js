$(document).ready(function(){	
	console.log("hi");
	var publisherRecords = $('#publisherListing').DataTable({
		"lengthChange": false,
		"processing":true,
		"serverSide":true,		
		"bFilter": false,		
		'serverMethod': 'post',		
		"order":[],
		"ajax":{
			url:"publisher_action.php",
			type:"POST",
			data:{action:'listPublisher'},
			dataType:"json"
		},
		"columnDefs":[
			{
				"targets":[0, 3, 4],
				"orderable":false,
			},
		],
		"pageLength": 10
	});	
	
	$('#addPublisher').click(function(){
		$('#publisherModal').modal({
			backdrop: 'static',
			keyboard: false
		});		
		$("#publisherModal").on("shown.bs.modal", function () {
			$('#publisherForm')[0].reset();				
			$('.modal-title').html("<i class='fa fa-plus'></i> Add publisher");					
			$('#action').val('addPublisher');
			$('#save').val('Save');
		});
	});		
	
	$("#publisherListing").on('click', '.update', function(){
		var publisherid = $(this).attr("id");
		var action = 'getPublisherDetails';
		$.ajax({
			url:'publisher_action.php',
			method:"POST",
			data:{publisherid:publisherid, action:action},
			dataType:"json",
			success:function(respData){				
				$("#publisherModal").on("shown.bs.modal", function () { 
					$('#publisherForm')[0].reset();
					respData.data.forEach(function(item){						
						$('#publisherid').val(item['publisherid']);						
						$('#name').val(item['name']);	
						$('#status').val(item['status']);						
					});														
					$('.modal-title').html("<i class='fa fa-plus'></i> Edit publisher");
					$('#action').val('updatePublisher');
					$('#save').val('Save');					
				}).modal({
					backdrop: 'static',
					keyboard: false
				});			
			}
		});
	});
	
	$("#publisherModal").on('submit','#publisherForm', function(event){
		event.preventDefault();
		$('#save').attr('disabled','disabled');
		var formData = $(this).serialize();
		$.ajax({
			url:"publisher_action.php",
			method:"POST",
			data:formData,
			success:function(data){				
				$('#publisherForm')[0].reset();
				$('#publisherModal').modal('hide');				
				$('#save').attr('disabled', false);
				publisherRecords.ajax.reload();
			}
		})
	});		

	$("#publisherListing").on('click', '.delete', function(){
		var publisherid = $(this).attr("id");		
		var action = "deletePublisher";
		if(confirm("Are you sure you want to delete this record?")) {
			$.ajax({
				url:"publisher_action.php",
				method:"POST",
				data:{publisherid:publisherid, action:action},
				success:function(data) {					
					publisherRecords.ajax.reload();
				}
			})
		} else {
			return false;
		}
	});
	
});