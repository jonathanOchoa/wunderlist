
		var document = $(this);
		
		$(document).ready(function(){ 
		
			// AÑADIR CUENTA
			$(".ejecutarObtenerLogin").on('click', function(){
				console.log('primera fase');
				
				api.integration.wunderlist.addAccount(function (error) {
					console.log('segunda fase addAccount');
					// Si el error detiene la ejecución y devuelve un error
					if(error){
					   wunderlistErrorList(error);
					}
				});
			});
		});
		
		
		
		// List account
		function show_accounts(){ 
			console.log('show account');
			wunderlist_accounts = [];
			api.integration.wunderlist.listAccounts(function (error, accounts) {
				
				if(error)
					wunderlistErrorList(error);                
				
				if(accounts.length > 0){
					var wunderlist_total_accounts = 0;
					accounts.forEach(function (account) {                                 
						
						wunderlist_accounts[wunderlist_total_accounts] = account;
					
						//console.log(wunderlist_accounts[wunderlist_total_accounts]);
						//console.log(account.getLists);
																					
						$(".ejecutarObtenerLogin").before(
							'<li class="context-menu-item menuItem hasSubmenu seleccionador-cuenta" id="'+wunderlist_total_accounts+'" aria-visible="false">'+
								'<span class="label">'+ account.sub +'</span>'+
								'<span class="chevron">'+
									'<svg class="folder-arrow" width="15px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="folder-arrow"> <path d="M13.61,16.8575 C13.79,16.6575 13.79,16.3375 13.61,16.1375 L7.45,9.9975 L13.61,3.8575 C13.79,3.6575 13.79,3.3375 13.61,3.1375 C13.41,2.9575 13.09,2.9575 12.89,3.1375 L6.39,9.6375 C6.21,9.8375 6.21,10.1575 6.39,10.3575 L12.89,16.8575 C12.99,16.9575 13.13,16.9975 13.25,16.9975 C13.37,16.9975 13.51,16.9575 13.61,16.8575 Z" id="w"></path> </g> </g> </svg>'+
								'</span>'+
								'<ul class="context-menu listsSubmenu ejecutarEliminarCuenta" >'+
									'<li class="context-menu-item menuItem" title="'+ account.sub +'"'+ account.id +'">'+
										'<span class="context-menu-icon"></span>'+
										'<span class="label">Eliminar Cuenta</span>'+
									'<span class="chevron">'+
										'<svg class="folder-arrow" width="15px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="folder-arrow"> <path d="M13.61,16.8575 C13.79,16.6575 13.79,16.3375 13.61,16.1375 L7.45,9.9975 L13.61,3.8575 C13.79,3.6575 13.79,3.3375 13.61,3.1375 C13.41,2.9575 13.09,2.9575 12.89,3.1375 L6.39,9.6375 C6.21,9.8375 6.21,10.1575 6.39,10.3575 L12.89,16.8575 C12.99,16.9575 13.13,16.9975 13.25,16.9975 C13.37,16.9975 13.51,16.9575 13.61,16.8575 Z" id="w"></path> </g> </g> </svg>'+
									'</span>'+
									'</li>'+
								'</ul>'+
							'</li>'
						);
					
						wunderlist_total_accounts++;
					});
					
				}else{}
				
				//Mostrar datos cuenta por defecto.
				$("li.emailApi").text(accounts[0].sub); 
				$("span.emailApi").text(accounts[0].sub); 
				$("span.nameApi").text(accounts[0].name); 
				$("div.nameApi").title = accounts[0].name; 
				$("li.nameApi").title = accounts[0].name; 
				$("texto.nameApi").data(accounts[0].name); 
				
				// Mostrar datos de la cuenta seleccionada
				$(".seleccionador-cuenta").on('click', function(e){
					e.stopPropagation();
					var i = $(this).attr('id');
					$("li.emailApi").text(accounts[i].sub); 
					$("span.emailApi").text(accounts[i].sub); 
					$("span.nameApi").text(accounts[i].name); 
					$("div.nameApi").title = accounts[i].name; 
					$("li.nameApi").title = accounts[i].name; 
					$("texto.nameApi").data(accounts[i].name); 
				
				});
				
				// borrar cuenta
				$(".ejecutarEliminarCuenta").on('click', function(){
					console.log(accounts[0].id);
					var account_id = accounts[0].id;
					api.integration.wunderlist.removeAccount(account_id, function () {
						console.log('se borro');
					});
				});
				
				// listar 
				console.log(accounts);
				accounts[0].getLists(function (listars) {
					console.log('getLists: ');
					console.log(listars);
				});
				
				// mostar listas
				$(".lists-collection").append(
					'<li role="menuitem" tabindex="0" id="lista9" class="sidebarItem list draggable owner" draggable="true" rel="333192657" aria-label="Familia, 2 tareas">'+
						'<a href="#/lists/333192657" aria-hidden="true">'+
							'<span class="list-icon">'+
								'<svg class="list rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Web-svgs" stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="list"> <path d="M3,7 C2.44,7 2,6.56 2,6 L2,5 C2,4.44 2.44,4 3,4 L4,4 C4.56,4 5,4.44 5,5 L5,6 C5,6.56 4.56,7 4,7 L3,7 Z M4,5 L3,5 L3,6 L4,6 L4,5 Z M7.5,6 C7.22,6 7,5.78 7,5.5 C7,5.22 7.22,5 7.5,5 L17.5,5 C17.78,5 18,5.22 18,5.5 C18,5.78 17.78,6 17.5,6 L7.5,6 Z M3,12 C2.44,12 2,11.56 2,11 L2,10 C2,9.44 2.44,9 3,9 L4,9 C4.56,9 5,9.44 5,10 L5,11 C5,11.56 4.56,12 4,12 L3,12 Z M4,10 L3,10 L3,11 L4,11 L4,10 Z M7.5,11 C7.22,11 7,10.78 7,10.5 C7,10.22 7.22,10 7.5,10 L17.5,10 C17.78,10 18,10.22 18,10.5 C18,10.78 17.78,11 17.5,11 L7.5,11 Z M3,17 C2.44,17 2,16.56 2,16 L2,15 C2,14.44 2.44,14 3,14 L4,14 C4.56,14 5,14.44 5,15 L5,16 C5,16.56 4.56,17 4,17 L3,17 Z M4,15 L3,15 L3,16 L4,16 L4,15 Z M7.5,16 C7.22,16 7,15.78 7,15.5 C7,15.22 7.22,15 7.5,15 L17.5,15 C17.78,15 18,15.22 18,15.5 C18,15.78 17.78,16 17.5,16 L7.5,16 Z" id="K"> </path> </g> </g> </svg>'+
							'</span>'+
							'<span class="title">Comida</span>'+
							'<span class="overdue-count" aria-hidden="true"></span>'+
							'<span class="count" aria-hidden="true">2</span>'+
							'<span class="list-options ejecutarMostrarCompartir" title="Opciones de lista" aria-label="Opciones de lista">'+
								'<svg class="options rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill-rule="evenodd"><g id="options"><path d="M17.1330617,2.8594383 C15.9930617,1.7194383 14.0130617,1.7194383 12.8930617,2.8594383 L5.5130617,10.2394383 C5.3330617,10.4394383 5.3330617,10.7594383 5.5130617,10.9594383 C5.7130617,11.1394383 6.0330617,11.1394383 6.2330617,10.9594383 L13.5930617,3.5594383 C14.3530617,2.7994383 15.6730617,2.7994383 16.4130617,3.5594383 C17.1730617,4.3194383 17.1930617,5.5594383 16.4130617,6.3394383 L9.0330617,13.7594383 C8.7130617,14.0794383 8.9330617,14.6194383 9.3730617,14.6194383 C9.5130617,14.6194383 9.6330617,14.5594383 9.7330617,14.4594383 L17.1330617,7.0394383 C18.2930617,5.8794383 18.2930617,4.0194383 17.1330617,2.8594383 L17.1330617,2.8594383 Z M8.4930617,15.3594383 C8.0330617,13.4594383 6.5130617,11.9394383 4.6130617,11.4794383 C4.3530617,11.4194383 4.0930617,11.5794383 4.0130617,11.8194383 L2.0330617,17.3194383 C1.8730617,17.7194383 2.2730617,18.1194383 2.6730617,17.9594383 C8.6730617,15.7794383 8.2530617,15.9594383 8.3730617,15.8194383 C8.4930617,15.6994383 8.5330617,15.5194383 8.4930617,15.3594383 L8.4930617,15.3594383 Z M3.3330617,16.6594383 L4.8130617,12.5794383 C6.0130617,12.9994383 6.9730617,13.9794383 7.3930617,15.1794383 L3.3330617,16.6594383 Z" id="N"></path> </g></g></svg>'+
							'</span>'+
						'</a>'+
					'</li>'
				);
				
				// mostar tareas pendientes
				$(".lista-notas-pendientes").append(
					'<li tabindex="0" id="nota8" class="taskItem lista-tareas-pendientes" rel="3439721854" aria-label="fgbdgfPresiona la tecla TAB para acceder a más opciones." draggable="true">'+
						'<div class="taskItem-body">'+
							'<a class="taskItem-checkboxWrapper checkBox" tabindex="-1" aria-hidden="true">'+
								'<span title="Marcar como completada">'+
									'<svg class="task-check" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M17.5,4.5c0,-0.53 -0.211,-1.039 -0.586,-1.414c-0.375,-0.375 -0.884,-0.586 -1.414,-0.586c-2.871,0 -8.129,0 -11,0c-0.53,0 -1.039,0.211 -1.414,0.586c-0.375,0.375 -0.586,0.884 -0.586,1.414c0,2.871 0,8.129 0,11c0,0.53 0.211,1.039 0.586,1.414c0.375,0.375 0.884,0.586 1.414,0.586c2.871,0 8.129,0 11,0c0.53,0 1.039,-0.211 1.414,-0.586c0.375,-0.375 0.586,-0.884 0.586,-1.414c0,-2.871 0,-8.129 0,-11Z" style="fill:none;stroke-width:1px"></path> </g> </svg>'+
								'</span>'+ 
								'<span title="Marcar como no completada">'+
									'<svg class="task-checked" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M9.5,14c-0.132,0 -0.259,-0.052 -0.354,-0.146c-1.485,-1.486 -3.134,-2.808 -4.904,-3.932c-0.232,-0.148 -0.302,-0.457 -0.153,-0.691c0.147,-0.231 0.456,-0.299 0.69,-0.153c1.652,1.049 3.202,2.266 4.618,3.621c2.964,-4.9 5.989,-8.792 9.749,-12.553c0.196,-0.195 0.512,-0.195 0.708,0c0.195,0.196 0.195,0.512 0,0.708c-3.838,3.837 -6.899,7.817 -9.924,12.902c-0.079,0.133 -0.215,0.221 -0.368,0.24c-0.021,0.003 -0.041,0.004 -0.062,0.004"></path> <path d="M15.5,18l-11,0c-1.379,0 -2.5,-1.121 -2.5,-2.5l0,-11c0,-1.379 1.121,-2.5 2.5,-2.5l10,0c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-10,0c-0.827,0 -1.5,0.673 -1.5,1.5l0,11c0,0.827 0.673,1.5 1.5,1.5l11,0c0.827,0 1.5,-0.673 1.5,-1.5l0,-9.5c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5l0,9.5c0,1.379 -1.121,2.5 -2.5,2.5"></path> </g> </svg>'+
								'</span>'+ 
							'</a>'+
							'<div class="taskItem-titleWrapper" tabindex="-1" aria-hidden="true">'+ 
								'<span class="taskItem-titleWrapper-title">nota 4</span>'+  
							'</div>'+ 
							'<span class="conversations-wrapper hidden " title="Esta tarea tiene comentarios">'+ 
								'<svg class="conversations-small rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g class="outlined"> <path d="M6.26,15 C5.98,15 5.68,14.96 5.38,14.9 C5.18,14.84 5.04,14.68 5,14.48 C4.98,14.26 5.08,14.06 5.26,13.96 C5.78,13.68 6.02,13.3 6,12.8 C6,12.48 5.84,12.16 5.64,11.76 C5.36,11.18 5,10.48 5,9.5 C5,7.02 7.24,5 10,5 C12.76,5 15,7.02 15,9.5 C15,11.98 12.76,14 10,14 C9.58,14 9.16,13.96 8.76,13.86 C8.38,14.28 7.56,15 6.26,15 L6.26,15 Z M10,6 C7.8,6 6,7.56 6,9.5 C6,10.24 6.28,10.78 6.54,11.32 C6.78,11.8 7,12.26 7,12.78 C7,13.22 6.9,13.62 6.7,13.96 C7.64,13.78 8.12,13.06 8.14,13.02 C8.26,12.84 8.5,12.76 8.7,12.82 C9.14,12.94 9.56,13 10,13 C12.2,13 14,11.42 14,9.5 C14,7.56 12.2,6 10,6 L10,6 Z"></path> </g> <g class="filled"> <path d="M6.26,15 C5.98,15 5.68,14.96 5.38,14.9 C5.18,14.84 5.04,14.68 5,14.48 C4.98,14.28 5.08,14.08 5.26,13.98 C5.78,13.68 6.02,13.32 6,12.8 C6,12.5 5.84,12.16 5.64,11.78 C5.36,11.2 5,10.48 5,9.5 C5,7.02 7.24,5 10,5 C12.76,5 15,7.02 15,9.5 C15,11.98 12.76,14 10,14 C9.58,14 9.16,13.96 8.76,13.88 C8.38,14.28 7.56,15 6.26,15 L6.26,15 Z" opacity="0"></path> </g> </svg>'+ 
							'</span>'+
							'<span class="attachment-wrapper hidden" title="Esta tarea tiene datos adjuntos">'+ 
								'<svg class="attachment" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="attachment"> <path d="M13.4075,5.2925 C13.0275,4.9125 12.3675,4.9125 11.9875,5.2925 L10.3075,6.9925 L8.7475,6.9925 C7.8075,6.9925 6.9475,7.3525 6.2675,8.0125 L5.1475,9.1325 C5.0675,9.2325 5.0075,9.3525 5.0075,9.4925 C5.0075,9.6125 5.0675,9.7525 5.1475,9.8325 L7.3075,11.9925 L5.1475,14.1325 C4.9675,14.3325 4.9675,14.6525 5.1475,14.8525 C5.2475,14.9525 5.3875,14.9925 5.5075,14.9925 C5.6475,14.9925 5.7675,14.9525 5.8675,14.8525 L8.0075,12.6925 L10.1675,14.8525 C10.2475,14.9525 10.3875,14.9925 10.5075,14.9925 C10.6475,14.9925 10.7675,14.9525 10.8675,14.8525 L11.9875,13.7325 C12.6475,13.0725 13.0075,12.1925 13.0075,11.2525 L13.0075,9.6925 L14.7075,8.0125 C15.0875,7.6125 15.0875,6.9725 14.7075,6.5925 L13.4075,5.2925 Z M13.9875,7.2925 L12.1675,9.1325 C12.0675,9.2325 12.0075,9.3525 12.0075,9.4925 L12.0075,11.2525 C12.0075,11.9125 11.7475,12.5525 11.2875,13.0125 L10.5075,13.7925 L6.2075,9.4925 L6.9875,8.7125 C7.4475,8.2525 8.0875,7.9925 8.7475,7.9925 L10.5075,7.9925 C10.6475,7.9925 10.7675,7.9325 10.8675,7.8325 L12.7075,6.0125 L13.9875,7.2925 Z" id="Q"></path> </g> </g> </svg>'+ 
							'</span>'+ 
							'<span class="taskItem-duedate  hidden" tabindex="-1" aria-hidden="true"></span>'+
							'<span class="recurrence-wrapper  hidden" tabindex="-1" aria-hidden="true" title="Recurring to-do">'+
								'<svg class="recurrence" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="recurrence"> <path d="M17.5193115,10 C17.2393115,10 16.9993115,10.2 16.9793115,10.46 C16.7393115,14.12 13.6793115,17 10.0193115,17 C6.15931146,17 3.01931146,13.86 3.01931146,10 C3.01931146,6.14 6.15931146,3 10.0193115,3 C13.3393115,3 15.2593115,5.48 16.3993115,6.98 C16.4193115,6.98 16.4193115,7 16.4193115,7 L12.9793115,7 C12.7193115,7 12.4793115,7.22 12.4793115,7.5 C12.4793115,7.78 12.7193115,8 12.9793115,8 C17.8393115,8 17.5593115,8.02 17.6793115,7.96 C17.8593115,7.88 17.9793115,7.7 17.9793115,7.5 L17.9793115,2.5 C17.9793115,2.22 17.7593115,2 17.4793115,2 C17.2193115,2 16.9793115,2.22 16.9793115,2.5 L16.9793115,6.08 C15.7793115,4.52 13.6193115,2 10.0193115,2 C5.59931146,2 2.01931146,5.58 2.01931146,10 C2.01931146,14.42 5.59931146,18 10.0193115,18 C14.1993115,18 17.6993115,14.72 17.9793115,10.54 C17.9993115,10.26 17.7993115,10.02 17.5193115,10 L17.5193115,10 Z M9.47931146,5 C9.21931146,5 8.97931146,5.22 8.97931146,5.5 L8.97931146,10.5 C8.97931146,10.78 9.21931146,11 9.47931146,11 L13.4793115,11 C13.7593115,11 13.9793115,10.78 13.9793115,10.5 C13.9793115,10.22 13.7593115,10 13.4793115,10 L9.97931146,10 L9.97931146,5.5 C9.97931146,5.22 9.75931146,5 9.47931146,5 L9.47931146,5 Z" id="f"></path> </g> </g> </svg>'+ 
							'</span>'+ 
							'<a class="taskItem-assign hidden" tabindex="-1" aria-hidden="true">  </a>'+
							'<a class="taskItem-star" tabindex="-1" aria-hidden="true">'+ 
								'<!--hidden para ocutar la estrella-->'+
								'<span class="star-wrapper " title="Marcar como destacada">'+ 
									'<svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"> <g> <path d="M3.74,18 C3.64,18 3.54,17.96 3.46,17.9 C3.28,17.76 3.2,17.54 3.28,17.34 L5.16,11.5 L0.2,7.9 C0.04,7.78 -0.04,7.56 0.02,7.34 C0.1,7.14 0.28,7 0.5,7 L6.64,7 L8.52,1.16 C8.66,0.76 9.34,0.76 9.48,1.16 L11.38,7 L17.5,7 C17.72,7 17.9,7.14 17.98,7.34 C18.04,7.56 17.96,7.78 17.8,7.9 L12.84,11.5 L14.72,17.34 C14.8,17.54 14.72,17.76 14.54,17.9 C14.38,18.02 14.14,18.02 13.96,17.9 L9,14.3 L4.04,17.9 C3.96,17.96 3.84,18 3.74,18 L3.74,18 Z M9,13.18 C9.1,13.18 9.2,13.2 9.3,13.28 L13.3,16.18 L11.78,11.46 C11.7,11.26 11.78,11.04 11.96,10.92 L15.96,8 L11,8 C10.8,8 10.6,7.86 10.54,7.66 L9,2.94 L7.46,7.66 C7.4,7.86 7.22,8 7,8 L2.04,8 L6.04,10.92 C6.22,11.04 6.3,11.26 6.22,11.46 L4.7,16.18 L8.7,13.28 C8.8,13.2 8.9,13.18 9,13.18 L9,13.18 Z"></path> </g> </svg>'+ 
								'</span>'+ 
								'<!--hidden para ocutar la estrella con lazo rojo de destacado-->'+
								'<span class="starred-wrapper hidden" title="Marcar como no destacada">'+ 
									'<svg width="22px" height="44px" viewBox="0 0 22 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M0,0l0,40.5c0,0.28 0.22,0.42 0.48,0.32l10.04,-3.64c0.28,-0.1 0.7,-0.1 0.96,0l10.04,3.64c0.28,0.1 0.48,-0.04 0.48,-0.32l0,-40.5l-22,0ZM14.46,24.08l1.68,5.26c0.08,0.18 0,0.38 -0.16,0.5c-0.14,0.1 -0.36,0.1 -0.52,0l-4.46,-3.24l-4.46,3.24c-0.08,0.06 -0.18,0.1 -0.28,0.1c-0.08,0 -0.18,-0.04 -0.24,-0.1c-0.16,-0.12 -0.24,-0.32 -0.16,-0.5l1.68,-5.26l-4.46,-3.24c-0.14,-0.12 -0.22,-0.32 -0.16,-0.52c0.08,-0.18 0.24,-0.32 0.44,-0.32l5.52,0l1.68,-5.24c0.14,-0.36 0.74,-0.36 0.88,0l1.7,5.24l5.5,0c0.2,0 0.36,0.14 0.44,0.32c0.06,0.2 -0.02,0.4 -0.16,0.52l-4.46,3.24Z"></path> </g> </svg>'+ 
								'</span>'+ 
							'</a>'+ 
							'<div class="taskItem-progress transparent">'+
								'<span class="taskItem-progress-bar"></span>'+ 
							'</div>'+
						'</div>'+ 
					'</li>'
				);
				
				// mostar tareas comletadas
				$(".lista-notas-completadas").append(
					'<li tabindex="0" id="nota6" class="taskItem done" rel="3443181717" aria-label="reunion undefinedPresiona la tecla TAB para acceder a más opciones." draggable="true">'+
						'<div class="taskItem-body">'+ 
							'<a class="taskItem-checkboxWrapper checkBox checked" tabindex="-1" aria-hidden="true">'+ 
								'<span title="Marcar como completada">'+
									'<svg class="task-check" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M17.5,4.5c0,-0.53 -0.211,-1.039 -0.586,-1.414c-0.375,-0.375 -0.884,-0.586 -1.414,-0.586c-2.871,0 -8.129,0 -11,0c-0.53,0 -1.039,0.211 -1.414,0.586c-0.375,0.375 -0.586,0.884 -0.586,1.414c0,2.871 0,8.129 0,11c0,0.53 0.211,1.039 0.586,1.414c0.375,0.375 0.884,0.586 1.414,0.586c2.871,0 8.129,0 11,0c0.53,0 1.039,-0.211 1.414,-0.586c0.375,-0.375 0.586,-0.884 0.586,-1.414c0,-2.871 0,-8.129 0,-11Z" style="fill:none;stroke-width:1px"></path> </g> </svg>'+ 
								'</span>'+
								'<span title="Marcar como no completada">'+
									'<svg class="task-checked" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M9.5,14c-0.132,0 -0.259,-0.052 -0.354,-0.146c-1.485,-1.486 -3.134,-2.808 -4.904,-3.932c-0.232,-0.148 -0.302,-0.457 -0.153,-0.691c0.147,-0.231 0.456,-0.299 0.69,-0.153c1.652,1.049 3.202,2.266 4.618,3.621c2.964,-4.9 5.989,-8.792 9.749,-12.553c0.196,-0.195 0.512,-0.195 0.708,0c0.195,0.196 0.195,0.512 0,0.708c-3.838,3.837 -6.899,7.817 -9.924,12.902c-0.079,0.133 -0.215,0.221 -0.368,0.24c-0.021,0.003 -0.041,0.004 -0.062,0.004"></path> <path d="M15.5,18l-11,0c-1.379,0 -2.5,-1.121 -2.5,-2.5l0,-11c0,-1.379 1.121,-2.5 2.5,-2.5l10,0c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-10,0c-0.827,0 -1.5,0.673 -1.5,1.5l0,11c0,0.827 0.673,1.5 1.5,1.5l11,0c0.827,0 1.5,-0.673 1.5,-1.5l0,-9.5c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5l0,9.5c0,1.379 -1.121,2.5 -2.5,2.5"></path> </g> </svg>'+ 
								'</span>'+
							'</a>'+ 
							'<div class="taskItem-titleWrapper" tabindex="-1" aria-hidden="true">'+ 
								'<span class="taskItem-titleWrapper-title">reunion</span>'+
								'<div class="taskItem-titleMeta-info">'+ 
									'<text class="nameApi" rel="label_by_$" title="jonathan">jonathan</token></text>'+
								'</div>'+
							'</div>'+ 
							'<span class="conversations-wrapper hidden " title="Esta tarea tiene comentarios">'+
								'<svg class="conversations-small rtl-flip" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g class="outlined"> <path d="M6.26,15 C5.98,15 5.68,14.96 5.38,14.9 C5.18,14.84 5.04,14.68 5,14.48 C4.98,14.26 5.08,14.06 5.26,13.96 C5.78,13.68 6.02,13.3 6,12.8 C6,12.48 5.84,12.16 5.64,11.76 C5.36,11.18 5,10.48 5,9.5 C5,7.02 7.24,5 10,5 C12.76,5 15,7.02 15,9.5 C15,11.98 12.76,14 10,14 C9.58,14 9.16,13.96 8.76,13.86 C8.38,14.28 7.56,15 6.26,15 L6.26,15 Z M10,6 C7.8,6 6,7.56 6,9.5 C6,10.24 6.28,10.78 6.54,11.32 C6.78,11.8 7,12.26 7,12.78 C7,13.22 6.9,13.62 6.7,13.96 C7.64,13.78 8.12,13.06 8.14,13.02 C8.26,12.84 8.5,12.76 8.7,12.82 C9.14,12.94 9.56,13 10,13 C12.2,13 14,11.42 14,9.5 C14,7.56 12.2,6 10,6 L10,6 Z"></path> </g> <g class="filled"> <path d="M6.26,15 C5.98,15 5.68,14.96 5.38,14.9 C5.18,14.84 5.04,14.68 5,14.48 C4.98,14.28 5.08,14.08 5.26,13.98 C5.78,13.68 6.02,13.32 6,12.8 C6,12.5 5.84,12.16 5.64,11.78 C5.36,11.2 5,10.48 5,9.5 C5,7.02 7.24,5 10,5 C12.76,5 15,7.02 15,9.5 C15,11.98 12.76,14 10,14 C9.58,14 9.16,13.96 8.76,13.88 C8.38,14.28 7.56,15 6.26,15 L6.26,15 Z" opacity="0"></path> </g> </svg>'+
							'</span>'+ 
							'<span class="attachment-wrapper hidden" title="Esta tarea tiene datos adjuntos">'+ 
								'<svg class="attachment" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="attachment"> <path d="M13.4075,5.2925 C13.0275,4.9125 12.3675,4.9125 11.9875,5.2925 L10.3075,6.9925 L8.7475,6.9925 C7.8075,6.9925 6.9475,7.3525 6.2675,8.0125 L5.1475,9.1325 C5.0675,9.2325 5.0075,9.3525 5.0075,9.4925 C5.0075,9.6125 5.0675,9.7525 5.1475,9.8325 L7.3075,11.9925 L5.1475,14.1325 C4.9675,14.3325 4.9675,14.6525 5.1475,14.8525 C5.2475,14.9525 5.3875,14.9925 5.5075,14.9925 C5.6475,14.9925 5.7675,14.9525 5.8675,14.8525 L8.0075,12.6925 L10.1675,14.8525 C10.2475,14.9525 10.3875,14.9925 10.5075,14.9925 C10.6475,14.9925 10.7675,14.9525 10.8675,14.8525 L11.9875,13.7325 C12.6475,13.0725 13.0075,12.1925 13.0075,11.2525 L13.0075,9.6925 L14.7075,8.0125 C15.0875,7.6125 15.0875,6.9725 14.7075,6.5925 L13.4075,5.2925 Z M13.9875,7.2925 L12.1675,9.1325 C12.0675,9.2325 12.0075,9.3525 12.0075,9.4925 L12.0075,11.2525 C12.0075,11.9125 11.7475,12.5525 11.2875,13.0125 L10.5075,13.7925 L6.2075,9.4925 L6.9875,8.7125 C7.4475,8.2525 8.0875,7.9925 8.7475,7.9925 L10.5075,7.9925 C10.6475,7.9925 10.7675,7.9325 10.8675,7.8325 L12.7075,6.0125 L13.9875,7.2925 Z" id="Q"></path> </g> </g> </svg>'+ 
							'</span>'+ 
							'<span class="taskItem-duedate  hidden" tabindex="-1" aria-hidden="true"></span>'+
							'<span class="recurrence-wrapper  hidden" tabindex="-1" aria-hidden="true" title="Recurring to-do">'+
								'<svg class="recurrence" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill-rule="evenodd"> <g id="recurrence"> <path d="M17.5193115,10 C17.2393115,10 16.9993115,10.2 16.9793115,10.46 C16.7393115,14.12 13.6793115,17 10.0193115,17 C6.15931146,17 3.01931146,13.86 3.01931146,10 C3.01931146,6.14 6.15931146,3 10.0193115,3 C13.3393115,3 15.2593115,5.48 16.3993115,6.98 C16.4193115,6.98 16.4193115,7 16.4193115,7 L12.9793115,7 C12.7193115,7 12.4793115,7.22 12.4793115,7.5 C12.4793115,7.78 12.7193115,8 12.9793115,8 C17.8393115,8 17.5593115,8.02 17.6793115,7.96 C17.8593115,7.88 17.9793115,7.7 17.9793115,7.5 L17.9793115,2.5 C17.9793115,2.22 17.7593115,2 17.4793115,2 C17.2193115,2 16.9793115,2.22 16.9793115,2.5 L16.9793115,6.08 C15.7793115,4.52 13.6193115,2 10.0193115,2 C5.59931146,2 2.01931146,5.58 2.01931146,10 C2.01931146,14.42 5.59931146,18 10.0193115,18 C14.1993115,18 17.6993115,14.72 17.9793115,10.54 C17.9993115,10.26 17.7993115,10.02 17.5193115,10 L17.5193115,10 Z M9.47931146,5 C9.21931146,5 8.97931146,5.22 8.97931146,5.5 L8.97931146,10.5 C8.97931146,10.78 9.21931146,11 9.47931146,11 L13.4793115,11 C13.7593115,11 13.9793115,10.78 13.9793115,10.5 C13.9793115,10.22 13.7593115,10 13.4793115,10 L9.97931146,10 L9.97931146,5.5 C9.97931146,5.22 9.75931146,5 9.47931146,5 L9.47931146,5 Z" id="f"></path> </g> </g> </svg>'+
							'</span>'+ 
							'<a class="taskItem-assign hidden" tabindex="-1" aria-hidden="true">  </a>'+ 
							'<a class="taskItem-star" tabindex="-1" aria-hidden="true">'+
								'<span class="star-wrapper " title="Marcar como destacada">'+
									'<svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"> <g> <path d="M3.74,18 C3.64,18 3.54,17.96 3.46,17.9 C3.28,17.76 3.2,17.54 3.28,17.34 L5.16,11.5 L0.2,7.9 C0.04,7.78 -0.04,7.56 0.02,7.34 C0.1,7.14 0.28,7 0.5,7 L6.64,7 L8.52,1.16 C8.66,0.76 9.34,0.76 9.48,1.16 L11.38,7 L17.5,7 C17.72,7 17.9,7.14 17.98,7.34 C18.04,7.56 17.96,7.78 17.8,7.9 L12.84,11.5 L14.72,17.34 C14.8,17.54 14.72,17.76 14.54,17.9 C14.38,18.02 14.14,18.02 13.96,17.9 L9,14.3 L4.04,17.9 C3.96,17.96 3.84,18 3.74,18 L3.74,18 Z M9,13.18 C9.1,13.18 9.2,13.2 9.3,13.28 L13.3,16.18 L11.78,11.46 C11.7,11.26 11.78,11.04 11.96,10.92 L15.96,8 L11,8 C10.8,8 10.6,7.86 10.54,7.66 L9,2.94 L7.46,7.66 C7.4,7.86 7.22,8 7,8 L2.04,8 L6.04,10.92 C6.22,11.04 6.3,11.26 6.22,11.46 L4.7,16.18 L8.7,13.28 C8.8,13.2 8.9,13.18 9,13.18 L9,13.18 Z"></path> </g> </svg>'+ 
								'</span>'+
								'<span class="starred-wrapper hidden" title="Marcar como no destacada">'+ 
									'<svg width="22px" height="44px" viewBox="0 0 22 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"> <g> <path d="M0,0l0,40.5c0,0.28 0.22,0.42 0.48,0.32l10.04,-3.64c0.28,-0.1 0.7,-0.1 0.96,0l10.04,3.64c0.28,0.1 0.48,-0.04 0.48,-0.32l0,-40.5l-22,0ZM14.46,24.08l1.68,5.26c0.08,0.18 0,0.38 -0.16,0.5c-0.14,0.1 -0.36,0.1 -0.52,0l-4.46,-3.24l-4.46,3.24c-0.08,0.06 -0.18,0.1 -0.28,0.1c-0.08,0 -0.18,-0.04 -0.24,-0.1c-0.16,-0.12 -0.24,-0.32 -0.16,-0.5l1.68,-5.26l-4.46,-3.24c-0.14,-0.12 -0.22,-0.32 -0.16,-0.52c0.08,-0.18 0.24,-0.32 0.44,-0.32l5.52,0l1.68,-5.24c0.14,-0.36 0.74,-0.36 0.88,0l1.7,5.24l5.5,0c0.2,0 0.36,0.14 0.44,0.32c0.06,0.2 -0.02,0.4 -0.16,0.52l-4.46,3.24Z"></path> </g> </svg>'+  
								'</span>'+ 
							'</a>'+ 
							'<div class="taskItem-progress transparent">'+ 
								'<span class="taskItem-progress-bar"></span>'+
							'</div>'+ 
						'</div>'+
					'</li>'
				);
			});
		}
		
		show_accounts();
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		