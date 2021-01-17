$(document).ready(function () {
    $('.timepicker').timepicker({
        autoClose : true, 
        format : 'T!ime selected: h:i a'
    });
    $('.datepicker').datepicker({
        autoClose : true,
        format : 'yyyy-mm-dd'
    });

});

$(".btn").click(function(){
    var fecha = new Date($('.datepicker').val());
    var minutos_examen_seleccionado = getMinutos($('.timepicker').val());
    if(se_puede_agendar(fecha, minutos_examen_seleccionado)){
        alert('Si se puede');
    } else{
        alert('No se pudo');
    }
    /*$.post("demo_test_post.asp",
    {
        name: "Donald Duck",
        city: "Duckburg"
    },
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });*/
});

function getMinutos(hora){
    let horas = parseInt(hora.slice(0,2));
    let minutos = parseInt(hora.slice(3,5));
    if(hora.slice(6, 8) == 'PM')
        horas += 12;
    minutos += horas*60;
    return minutos;
}

function se_puede_agendar(fecha, minutos_examen_seleccionado){
    var minutos_examenes = new Array(60, 100, 700, 1020, 1150);
    var i = 0;
    var se_puede = true;
    for(i=0; i<minutos_examenes.length; i++){
        if(minutos_examen_seleccionado < minutos_examenes[i]){
            if(i>0){
                if(minutos_examenes[i-1] + 105 > minutos_examen_seleccionado)
                    se_puede = false;
            } 
            if(minutos_examen_seleccionado + 105 > minutos_examenes[i])
                se_puede = false;
        } else{
            if(i == minutos_examenes.length-1 && minutos_examenes[i] + 105 > minutos_examen_seleccionado)
                se_puede = false;
        }
    }
    return se_puede;
}