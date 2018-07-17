$(document).ready(function(){
    
    $("#marca").prop('disabled', true);
    $("#modelo").prop('disabled', true);
    $("#ano").prop('disabled', true);
    $("#btnConsultar").prop('disabled', true);
        
    $("#tipo").on('change', function(){
        
    $("#marca").empty();
    $("#modelo").empty();
    $("#ano").empty();

    $("#modelo").prop('disabled', true);
    $("#ano").prop('disabled', true);

    $("#marca").prop('disabled', false);
    var tpVeiculo = $('#tipo').val();
        
    $.get( "http://fipeapi.appspot.com/api/1/"+tpVeiculo+"/marcas.json", function( obj ) {
        var selectbox = $('#marca');
                                selectbox.find('option');
                                $('<option>').val('').text('Selecione uma marca').appendTo(selectbox);
                for (var item in obj) {
                        if (obj != null) {
                            var data = obj[item];
                            var selectbox = $('#marca');
                            selectbox.find('option');
                                $('<option>').val(data.id).text(data.name).appendTo(selectbox);
                    }
                }
      });

    });

    $("#marca").on('change', function(){
    
    $("#modelo").empty();
    $("#ano").empty();

    $("#modelo").prop('disabled', false);
    var tpVeiculo = $('#tipo').val();
    var idMarca = $('#marca').val();    
        
    $.get( "http://fipeapi.appspot.com/api/1/"+tpVeiculo+"/veiculos/"+idMarca+".json", function( obj ) {
        var selectbox = $('#modelo');
                                selectbox.find('option');
                                $('<option>').val('').text('Selecione um veículo').appendTo(selectbox);
                for (var item in obj) {
                        if (obj != null) {
                            var data = obj[item];
                            var selectbox = $('#modelo');
                            selectbox.find('option');
                                $('<option>').val(data.id).text(data.name).appendTo(selectbox);
                    }
                }
      });
    });

    $("#modelo").on('change', function(){
    
        $("#ano").empty();
    
        $("#ano").prop('disabled', false);
        var tpVeiculo = $('#tipo').val();
        var idMarca = $('#marca').val(); 
        var idModelo = $('#modelo').val();    
            
        $.get( "http://fipeapi.appspot.com/api/1/"+tpVeiculo+"/veiculo/"+idMarca+"/"+idModelo+".json", function( obj ) {
            var selectbox = $('#ano');
                                    selectbox.find('option');
                                    $('<option>').val('').text('Selecione um ano').appendTo(selectbox);
                    for (var item in obj) {
                            if (obj != null) {
                                var data = obj[item];
                                var selectbox = $('#ano');
                                selectbox.find('option');
                                    $('<option>').val(data.fipe_codigo).text(data.name).appendTo(selectbox);
                        }
                    }
          });
        });

        $("#ano").on('change', function(){
            $("#btnConsultar").prop('disabled', false);
        });

        $("#btnConsultar").click(function(){

            var tpVeiculo = $('#tipo').val();
            var idMarca = $('#marca').val(); 
            var idModelo = $('#modelo').val();  
            var cdFipe = $('#ano').val();
            $.get( "http://fipeapi.appspot.com/api/1/"+tpVeiculo+"/veiculo/"+idMarca+"/"+idModelo+"/"+cdFipe+".json", function( data ) {
                var dialog = bootbox.dialog({
                    className: "without-margin",
                    message: `
                    <div class="container col">
                     <div class="card">
                        <div class="card-header">
                            <h1 class="h3 mb-3 font-weight-normal">Resultado</h1>
                        </div>
                            <div class="card-body">
                                    <div id="simulacao">
                                        <u><h1 class="text-center h3 mb-3 font-weight-normal">Dados do veículo</h1></u>
                                        
                                            <div class="row">
                                                <div class="col">
                                                <strong><label>Código FIPE: </strong>${data.fipe_codigo} </label>
                                                </div>
                                            </div>
                                            <br/>
                                            <div class="row">
                                                <div class="col">
                                                <strong><label>Veículo: </strong>${data.veiculo} </label>
                                                </div>
                                            </div>
                                            <br/>
                                            <div class="row">
                                                <div class="col">
                                                <strong><label>Marca: </strong>${data.marca} </label>
                                                </div>
                                            </div>
                                            <br/>
                                            <div class="row">
                                                <div class="col">
                                                <strong><label>Ano: </strong>${data.ano_modelo}</label>
                                                </div>
                                            </div>
                                            <br/>
                                            <div class="row">
                                                <div class="col">
                                                <strong> <label>Combustível: </strong>${data.combustivel}</label>
                                                </div>
                                            </div>
                                            <br/>
                                            <div class="row">
                                                <div class="col">
                                                    <strong><label>Preço: </strong>${data.preco} </label>
                                                </div>
                                            </div>
                                    </div>
                            </div>
                     </div>
                    </div>
                     `
                });
            });
            
            
        });
       
});
