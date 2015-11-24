// ajout d'évenement même pour les anciens navigateurs
var addEvent = function (element, event, func){
                    if(element.addEventListener){
                        element.addEventListener(event, func, false);
                    } else {
                        element.attachEvent ('on' + event,func);
                    }
                }

addEvent(window , 'load', function (){

    //on vérifie que le namespace AmericanNote n'existe pas déjà
    if (typeof AmericanNote === 'undefined'){
    
        var AmericanNote = {
            
            //propriété
            phpPath : 'php/americanNote.php',
            
            //méthode qui initialise le script
            init : function(){
                
                AmericanNote.EventHandlers.eventClick();
                
            },
        
        
            // gestion des événements
            EventHandlers : {
            
                // événement click
                eventClick : function (){
            
                    var button = document.getElementById('button');
                
                    addEvent (button,'click', function(){
                
                        AmericanNote.createOptions();
                        
                    });            
                },
                
                //événement change
                eventChange : function (){
                    
                    var selectMenu = document.getElementById('list');
                    
                    addEvent(selectMenu, 'change', function(e){
                        
                        var selectNote = e.target.value;
                        
                        if(selectNote !== 'default'){
                          
                            AmericanNote.setData(selectNote);
                        }
                        
                      });     
                }
            },
            
                     
            //se charge de créer le formulaire 
            createForm : function(){
            
                var myForm = document.createElement('form');
                myForm.action = '';
		        myForm.method = 'get';
		        myForm.id = 'myForm';
            
                var selectMenu = document.createElement('select');
		        selectMenu.id = 'list';
            
                var button = document.getElementById('button');
		
		      myForm.appendChild(selectMenu);
		      document.body.appendChild(myForm);	
                        
            },
            
            // se charge de créer les options du select, puis déclenche l'événement 'change'
            createOptions : function () {
            
                var musicalNotes = {//transformer en array
	               Do : 'C',
	               Ré : 'D',
	               Mi : 'E',
	               Fa : 'F',
	               Sol : 'G',
	               La : 'A',
	               Si : 'B',
	               Do : 'C'
                };
            
                AmericanNote.createForm();
            
                var selectMenu = document.getElementById('list');
                
                var defaultOption = document.createElement('option');
                
                defaultOption.value = 'default';
                defaultOption.selected = 'selected';
                
                var defaultText = document.createTextNode('Choisissez votre note');
                
                defaultOption.appendChild(defaultText);
                selectMenu.appendChild(defaultOption);
            
                for(var id in musicalNotes){
		
			         var optionElement = document.createElement('option');
			         optionElement.value = id;
			
			         var optionText = document.createTextNode(id);
			
			         optionElement.appendChild(optionText);
			         selectMenu.appendChild(optionElement);       
			     }
                
                AmericanNote.EventHandlers.eventChange();
                               
            },
            
            
            
            
            setData : function(selectNote){
                
                var xhr = new XMLHttpRequest ();
                
                xhr.open('GET', AmericanNote.phpPath+'?note='+selectNote);
                         
                addEvent(xhr,'readystatechange',function(){
                         
                    if(xhr.readyState == 4 && xhr.status == 200) {
                         
                        var element = document.getElementById('response');
                         
                        element.innerHTML =  xhr.responseText;
                        
                         
                    } else if (xhr.readyState == 4 && xhr.status !== 200) {
                         
                        alert('Une erreur est survenue! \n\nCode :'+ xhr.status +'readyState\n\n :'+xhr.readyState+'\nTexte: ' + xhr.statusText);
                    }
                });
                         
                
                xhr.send();
                
               AmericanNote.EventHandlers.eventChange();
        }
            
     };
    
    
} else {
    
    console.log('Ce namespace existe déjà.')
}

AmericanNote.init();

});