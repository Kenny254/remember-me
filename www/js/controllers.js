angular.module('mainApp.controllers', [])
	.controller('homeCtrl', function($scope){
		
	})
	.controller('notesCtrl', function($rootScope, $scope, $ionicModal, $firebase, $timeout, FIREBASE_URL){
		//initializing empty notes
		$scope.notes = [];

		//creating new instance of Firebase using base url
		var notesList = new Firebase(FIREBASE_URL);

		//using on listener for value event using snapshot of firebase
		notesList.on('value', function(snapshot){
			var note = snapshot.val();
			$scope.notes = [];
			$timeout(function(){	
				for (var key in note){
					if (note.hasOwnProperty(key)){
						note[key].key = key;
						$scope.notes.push(note[key]);
					}
					if (note === null){
				$scope.noNotes = true;
					} else {
						$scope.noNotes = false;
						}	
				}
				
			});
		});

		//for deleting the post
		$scope.deleteNote = function (key){
			var notesList = new Firebase(FIREBASE_URL);
			notesList.child(key).remove();
			console.log('deleted');
		};

	
		//this is used for calling newNotes.html when users click on newNote button
		$ionicModal.fromTemplateUrl('templates/newNotes.html', function(modal){
			$scope.modal = modal;
		});

		// $ionicModal.fromTemplateUrl('templates/update-notes.html', function(modal){
		// 	$scope.updatemodal = modal;
		// });


		// $scope.updateNotes = function(){
		// 	$scope.updatemodal.show();
		// }


		//opens new newNews.html page 
		$scope.newNotes = function (){
			$scope.modal.show();
		};

	
  		//Cleanup the modal when we're done with it!
  		$scope.$on('$destroy', function() {
    	$scope.modal.remove();
  		});

	})
	.controller('updateNotesCtrl', function($scope, $stateParams, $firebase, FIREBASE_URL, $timeout){
		var noteId = $stateParams.noteId;
		var note = new Firebase(FIREBASE_URL + noteId); 
		
		var notesList = new Firebase(FIREBASE_URL);
		notesList.on('value', function(snapshot){
		var note = snapshot.val();
			var id = $stateParams.noteId
				$timeout(function(){	
				//itirating over the list of not
				for (var key in note){
					if (note.hasOwnProperty(key)){
						note[key].key = key;
						$scope.note = note[id];	
					}
				}
			});
		});

		//for closing the modal
		// $scope.close = function (modal){
		// 	$scope.modal.hide();
		// }
	})
	.controller('picturesCtrl', function($scope, Pictures){
		$scope.pictures = Pictures.all();

	})
	.controller('messagesCtrl', function($scope, Messages){
		$scope.messages = Messages.all();
	})
	.controller('newNotesCtrl', function($rootScope, $scope, $ionicModal, $firebase, FIREBASE_URL){

		//for closing the modal
		$scope.close = function (modal){
			$scope.modal.hide();
		}

		//creating notes
		$scope.createNote = function(note){

			var note = {
				title: note.title,
				post: note.post,
				created: Date.now(),
				updated: Date.now()
			}
			
			var notesList = new Firebase(FIREBASE_URL);
			
			//adding note into firebase 
			$firebase(notesList).$add(note);
			console.log(note);
			$scope.modal.hide();
			$scope.addForm.$setPristine();
			$scope.note = {};
		};
		
	})
	.controller('noteCtrl', function($scope, $stateParams, $firebase, $timeout, FIREBASE_URL){
		var notesList = new Firebase(FIREBASE_URL);
		
		//using on listener for value event using snapshot of firebase
		notesList.on('value', function(snapshot){
			var note = snapshot.val();
			var id = $stateParams.noteId
			$timeout(function(){	

				//itirating over the list of not
				for (var key in note){
					if (note.hasOwnProperty(key)){
						note[key].key = key;
						$scope.note = note[id];	
					}
				}
			});
	
		});
		

	})