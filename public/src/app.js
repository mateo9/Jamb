$(document).ready(function()
{   
   random();
   firstClick(clickCount);
   down();
   up();
   upDown();
   sumNumDown();
   sumDownMaxMin();
   sumDownSpecial();
   sumNumUp();
   sumUpMaxMin();
   sumUpSpecial();
   sumNumUpDown();
   sumUpDownMaxMin();
   sumUpDownSpecial();
   sumNumBell();
   sumBellMaxMin();
   sumBellSpecial();
});


var isClicked = false;
var clickCount = 0;
var score = 0;
var count = 0;
var togg = true;
var dice = new Array();
var dice = [
            {src:"/img/dice1.png", value: 1},
            {src:"/img/dice2.png", value: 2},
            {src:"/img/dice3.png", value: 3},
            {src:"/img/dice4.png", value: 4},
            {src:"/img/dice5.png", value: 5},
            {src:"/img/dice6.png", value: 6} 
           ];


var results = new Array();
var num = new Array();

// Objekt u kojem se spremaju rezultati dobiveni ispunjavanjm polja
var allRes = {
  downNum: [0,0,0,0,0,0],
  upNum: [0,0,0,0,0,0],
  upDownNum: [0,0,0,0,0,0],
  bellNum: [0,0,0,0,0,0],
  downMaxMin: [0,0],
  upMaxMin: [0,0],
  upDownMaxMin: [0,0],
  bellMaxMin: [0,0],
  downSpecial: [0,0,0,0,0],
  upSpecial: [0,0,0,0,0],
  upDownSpecial: [0,0,0,0,0],
  bellSpecial: [0,0,0,0,0],
  endResults: [0,0,0,0,0,0,0,0,0,0,0,0]
};

// funkcija zadužena za bacanje kocke 
function random()
{     
  var anim = setInterval(function(){
  $('.dice').each(function()
  {
   var rand = Math.floor(Math.random() * 6);
   $(this).attr("src", dice[rand].src);
   $(this).attr("alt", dice[rand].value);
  });
  },25);
   
  setTimeout(function(){
    clearInterval(anim);
  },150);

	$('.dice').each(function()
	{
	 var rand = Math.floor(Math.random() * 6);
   $(this).attr("src", dice[rand].src);
   $(this).attr("alt", dice[rand].value);
       
   });
$('.btn-results').prop('disabled', false);
clickCount++;
// logika koja dopušta najviše tri bacanja kocke u jednom krugu
clickCount === 4 ? $('#dice-btn').prop('disabled', true) : $('#dice-btn').prop('disabled',false);
// logika koja dopušta 'prijavu' samo nakon prvog bacanja 
clickCount === 2 ? $('.call').css('background', '#47AFFF').prop('disabled', false) :
                   $('.call').prop('disabled', true).css('background', '');
  // logika koja ne dopušta upisivanje rezultata ako kocka prethodno nije bačena bar jedan put
if(clickCount === 1) $('.btn-results').prop('disabled', true);
if(!togg) $('.btn-results').prop('disabled', true);
// logika koja nas 'prisiljava' na prijavu ako su 'down', 'up' i 'up and down' stupci popunjeni
if(count === 39 && clickCount === 2)
{
      $('.call').css('background', '#47AFFF').prop('disabled', false);
      $('#dice-btn').prop('disabled', true);
}
              
}

 
 // funkcija koja nam omogučava izabiranje kocka koje čemo ostavit nakon bacanja
 function click() 
{   

  
	$('img').on('click', function()
	{
  
	$(this).toggleClass('dice');
	if(!($(this).hasClass('dice')))
	{
		$(this).css('background','blue');
	  results.push(this.alt);
    return;
	} else
	{
		$(this).css('background','white');
		var element = this.alt;
		results.splice(results.indexOf(element),1);
    return;
	}
	});
  

}

// funkcija koja nam ne dozvoljava da ostavljamo kocke prije prvog bacanja
function firstClick()
{  
   
   
   $('#dice-btn').on('click',function()
   {
   isClicked = true;
   if(isClicked === true)
   {
   	 $(this).off('click');
     click();
   } 
   });

}

// funkcija string u number
function convert(results)
{
 num = results.map(function(current)
{
   return parseInt(current);
});

}

//resert funkcija koja se poziva nakon svakog kruga
function resert()
{

  $('img').each(function() {
  if(!($(this).hasClass('dice'))) {
   $(this).addClass('dice').css("background","")
   }}).off('click');
  $('#dice-btn').prop('disabled', false).on('click', firstClick());
  clickCount = 0;
  score++;
  isClicked = false;
  results.splice(0,results.length);
  random();
  if(score === 52)
  {
  finalScore();
  }

}


// slijede funckije zadužene za računanje suma redova
function one(num)
{
  
  sum = 0;
  for(var i = 0; i < num.length; i++)
  {
    if(num[i] === 1)
    {
      sum += num[i];
    }
  }
   
}


function two(num)
{
  sum = 0;
  for(let i = 0; i < num.length; i++)
  {
    if(num[i] === 2)
    {
      sum += num[i];
    }
  }
}

function three(num)
{
  sum = 0;
  for(let i = 0; i < num.length; i++)
  {
    if(num[i] === 3)
    {
      sum += num[i];
    }
  }

}

function four(num)
{
  sum = 0;
  for(let i = 0; i < num.length; i++)
  {
    if(num[i] === 4)
    {
      sum += num[i];
    }
  }
}

function five(num)
{
  sum = 0;
  for(let i = 0; i < num.length; i++)
  {
    if(num[i] === 5)
    {
      sum += num[i];
    }
  }
}

function six(num)
{
  sum = 0;
  for(let i = 0; i < num.length; i++)
  {
    if(num[i] === 6)
    {
      sum += num[i];
    }
  }
}

function max(num)
{
  sum = num.reduce(function(acc,current)
  {
    return acc + current;
  },0);

}

function min(num)
{
  sum = num.reduce(function(acc,current)
  {
    return acc + current;
  },0);

}

function threeOfAKind(num)
{
  num.sort();
  sum = 0;
  for(let i = 0; i < num.length; i++)
  {
    if(num[i] === num[i+1] && num[i+1] === num[i+2])
    {
      sum = num[i] * 3;
    }
  }
  
}

function straight(num)
{
  num.sort();
  sum = 0;
  for(let i = 0; i < num.length; i++)
  {
    if(num[i] === 1 && num[i+1] === 2 && num[i+2] === 3 && num[i+3] === 4 && num[i+4] === 5)
    {
      sum = 35;
      return sum;
    }
    if(num[i] === 2 && num[i+1] === 3 && num[i+2] === 4 && num[i+3] === 5 && num[i+4] === 6)
    {
      sum = 45;
      return sum;
    } else {
      return sum = 0;
    }
  }
} 

function fullHouse(num)
{
  num.sort();
  sum = 0;

    if(num[0] === num[1] && num[1] === num[2] && num[3] === num[4] && num[0] !== num[3])
    {
      sum = (num[0] * 3) + (num[3] * 2) + 20;
      return sum;
     
    }
    if(num[0] === num[1] && num[2] === num[3] && num[3] === num[4] && num[0] !== num[2])
    {
      sum = (num[0] * 2) + (num[2] * 3) + 20;
      return sum;
    
    }
    else {
      return sum = 0;
    }
  
}

function poker(num)
{
  num.sort();
  sum = 0;
  for(let i = 0; i < num.length; i++)
  {
    if(num[i] === num[i+1] && num[i+1] === num[i+2] && num[i+2] === num[i+3])
    {
      sum = (num[i] * 4) + 30;
    }
  }
}

function jamb(num)
{
  num.sort();
  sum = 0;
  if(num[0] === num[4] && num.length === 5 )
  {
    sum = (num[0] * 5) + 40;
  }
}

// funkcija zadužena za provođenje igre prvog stupca
function down()
{

$('#one-down').css('background', '#47AFFF').addClass('down');
$('#one-down').on('click', function()
{ 
 
  one(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('down btn-results').css('background','');
   allRes.downNum[0] = sum;
   sumNumDown();
   count++;
  resert();
   $('#two-down').css('background', '#47AFFF').addClass('down');
  $('#two-down').on('click', function()
  {
    two(num);
    $(this).attr('value', sum).prop('disabled', true).removeClass('down btn-results').css('background', '');
    allRes.downNum[1] = sum;
    sumNumDown();
     count++;
     resert();
  $('#three-down').css('background', '#47AFFF').addClass('down');
  $('#three-down').on('click',function()
  {
    three(num);
    $(this).attr('value', sum).prop('disabled', true).removeClass('down btn-results').css('background', '');
    allRes.downNum[2] = sum;
    sumNumDown();
    count++;
    resert();
  $('#four-down').css('background', '#47AFFF').addClass('down');
  $('#four-down').on('click', function()
  {
    four(num);
    $(this).attr('value', sum).prop('disabled', true).removeClass('down btn-results').css('background', '');
    allRes.downNum[3] = sum;
    sumNumDown();
    count++;
    resert();
  $('#five-down').css('background', '#47AFFF').addClass('down');
  $('#five-down').on('click', function()
  {
    five(num);
    $(this).attr('value', sum).prop('disabled', true).removeClass('down btn-results').css('background', '');
    allRes.downNum[4] = sum;
    sumNumDown();
    count++;
    resert();
  $('#six-down').css('background', '#47AFFF').addClass('down');
  $('#six-down').on('click', function()
  {
    six(num);
    $(this).attr('value', sum).prop('disabled', true).removeClass('down btn-results').css('background', '');
    allRes.downNum[5] = sum;
    sumNumDown();
    count++;
    resert();
  $('#max-down').css('background', '#47AFFF').addClass('down');
  $('#max-down').on('click', function()
  {
    if(num.length === 5) {
    max(num);
    $(this).attr('value', sum).prop('disabled', true).removeClass('down btn-results').css('background', '');
    count++;
    resert();
    allRes.downMaxMin[0] = sum;
    sumDownMaxMin();
  } else { // u slučaju da igrać ne odabere svih pet kockica dobiva najmanji/najveći zbroj
        $(this).attr('value', 5).prop('disabled', true).removeClass('down btn-results').css('background', '');
        allRes.downMaxMin[0] = 5;
        sumDownMaxMin();
        count++;
        resert();
  }
  $('#min-down').css('background', '#47AFFF').addClass('down');
  $('#min-down').on('click',function()
  {
    if(num.length === 5) {
    min(num);
    $(this).attr('value', sum).prop('disabled', true).removeClass('down btn-results').css('background', '');
    count++;
    resert();
    allRes.downMaxMin[1] = sum;
    sumDownMaxMin();
  } else {  // u slučaju da igrać ne odabere svih pet kockica dobiva najmanji/najveći zbroj
    $(this).attr('value', 30).prop('disabled', true).removeClass('down btn-results').css('background', '');
    allRes.downMaxMin[1] = 30;
    sumDownMaxMin();
    count++;
    resert();
  }
  $('#toak-down').css('background', '#47AFFF').addClass('down');
  $('#toak-down').on('click', function()
  {
    threeOfAKind(num);
    $(this).attr('value', sum).prop('disabled', true).removeClass('down btn-results').css('background','');
    count++;
    resert();
    allRes.downSpecial[0] = sum;
    sumDownSpecial();
    $('#straight-down').css('background', '#47AFFF').addClass('down');
  $('#straight-down').on('click', function()
  {
    straight(num);
    $(this).attr('value', sum).prop('disabled', true).removeClass('down btn-results').css('background','');
    count++;
    resert();
    allRes.downSpecial[1] = sum;
    sumDownSpecial();
    $('#full-down').css('background', '#47AFFF').addClass('down');
  $('#full-down').on('click', function()
  {
     fullHouse(num);
     $(this).attr('value', sum).prop('disabled', true).removeClass('down btn-results').css('background','');
    count++;
    resert();
    allRes.downSpecial[2] = sum;
    sumDownSpecial();
     $('#poker-down').css('background', '#47AFFF').addClass('down');
  $('#poker-down').on('click', function()
  {
    poker(num);
     $(this).attr('value', sum).prop('disabled', true).removeClass('down btn-results').css('background', '');
    count++;
    resert();
    allRes.downSpecial[3] = sum;
    sumDownSpecial();
     $('#jamb-down').css('background', '#47AFFF').addClass('down');
  $('#jamb-down').on('click', function()
  {
    jamb(num);
     $(this).attr('value', sum).prop('disabled', true).removeClass('down btn-results').css('background', '');
    count++;
    resert();
    allRes.downSpecial[4] = sum;
    sumDownSpecial();
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  
});
}

// funkcija zadužena za provođenje igre drugog stupca
function up()
{

$('#jamb-up').css('background', '#47AFFF').addClass('up');
$('#jamb-up').on('click',function()
{
  jamb(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('up btn-results').css('background','');
  count++;
  resert();
  allRes.upSpecial[0] = sum;
  sumUpSpecial();
  $('#poker-up').css('background', '#47AFFF').addClass('up');
$('#poker-up').on('click', function()
{
  poker(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('up btn-results').css('background','');
  count++;
  resert()
  allRes.upSpecial[1] = sum;
  sumUpSpecial();
  $('#full-up').css('background', '#47AFFF');
$('#full-up').on('click', function()
{
  fullHouse(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('up btn-results').css('background','');
  count++;
  resert()
  allRes.upSpecial[2] = sum;
  sumUpSpecial();
  $('#straight-up').css('background', '#47AFFF').addClass('up');
$('#straight-up').on('click', function()
{
  straight(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('up btn-results').css('background','');
  count++;
  resert()
  allRes.upSpecial[3] = sum;
  sumUpSpecial();
  $('#toak-up').css('background', '#47AFFF').addClass('up');
$('#toak-up').on('click', function()
{
  threeOfAKind(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('up btn-results').css('background','');
  count++;
  resert();
  allRes.upSpecial[4] = sum;
  sumUpSpecial();
  $('#min-up').css('background', '#47AFFF').addClass('up');
$('#min-up').on('click', function()
{
  if(num.length === 5) {
  min(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('up btn-results').css('background','');
  count++;
  resert();
  allRes.upMaxMin[1] = sum;
  sumUpMaxMin();
  $('#max-up').css('background', '#47AFFF').addClass('up');
  }else { // u slučaju da igrać ne odabere svih pet kockica dobiva najmanji/najveći zbroj
    $(this).attr('value', 30).prop('disabled', true).removeClass('up btn-results').css('background', '');
    allRes.upMaxMin[1] = 30;
    sumUpMaxMin();
    count++;
    resert();
  }
$('#max-up').on('click', function()
{
  if(num.length === 5) {
  max(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('up btn-results').css('background','');
  count++;
  resert();
  allRes.upMaxMin[0] = sum;
  sumUpMaxMin();
  $('#six-up').css('background', '#47AFFF').addClass('up');
} else { // u slučaju da igrać ne odabere svih pet kockica dobiva najmanji/najveći zbroj
    $(this).attr('value', 5).prop('disabled', true).removeClass('up btn-results').css('background', '');
    allRes.upMaxMin[0] = 5;
    sumUpMaxMin();
    count++;
    resert();
  }
$('#six-up').on('click', function()
{
  six(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('up btn-results').css('background','');
  count++;
  resert();
  allRes.upNum[0] = sum;
  sumNumUp();
  $('#five-up').css('background', '#47AFFF').addClass('up');
$('#five-up').on('click', function()
{
  five(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('up btn-results').css('background','');
  count++;
  resert();
  allRes.upNum[1] = sum;
  sumNumUp();
  $('#four-up').css('background', '#47AFFF').addClass('up');
$('#four-up').on('click', function()
{
  four(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('up btn-results').css('background','');
  count++;
  resert();
  allRes.upNum[2] = sum;
  sumNumUp();
  $('#three-up').css('background', '#47AFFF').addClass('up');
$('#three-up').on('click', function()
{
  three(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('up btn-results').css('background','');
  count++;
  resert();
  allRes.upNum[3] = sum;
  sumNumUp();
  $('#two-up').css('background', '#47AFFF').addClass('up');
$('#two-up').on('click', function()
{
  two(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('up btn-results').css('background','');
  count++;
  resert();
  allRes.upNum[4] = sum;
  sumNumUp();
  $('#one-up').css('background', '#47AFFF').addClass('up');
$('#one-up').on('click', function()
{
  one(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('up btn-results').css('background','');
  count++;
  resert();
  allRes.upNum[5] = sum;
  sumNumUp();
});
});
});
});
});
});
});
});
});
});
});
});
});
}

// funkcija zadužena za provođenje igre trećeg stupca
function upDown()
{

$('.u-d').css('background', '#47AFFF');
$('#one-u-d').on('click', function()
{
  one(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
  allRes.upDownNum[0] = sum;
   sumNumUpDown();
});

$('#two-u-d').on('click', function()
{
  two(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
   allRes.upDownNum[1] = sum;
    sumNumUpDown();
});

$('#three-u-d').on('click', function()
{
  three(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
   allRes.upDownNum[2] = sum;
    sumNumUpDown();
});

$('#four-u-d').on('click', function()
{
  four(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
   allRes.upDownNum[3] = sum;
    sumNumUpDown();
});

$('#five-u-d').on('click', function()
{
  five(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
  allRes.upDownNum[4] = sum;
  sumNumUpDown();
});

$('#six-u-d').on('click', function()
{
  six(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
  allRes.upDownNum[5] = sum;
  sumNumUpDown();
});
$('#max-u-d').on('click', function()
{
  if(num.length === 5) {
  max(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
  allRes.upDownMaxMin[0] = sum;
  sumUpDownMaxMin();
  } else { // u slučaju da igrać ne odabere svih pet kockica dobiva najmanji/najveći zbroj
  $(this).attr('value', 5).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
  allRes.upDownMaxMin[0] = 5;
  sumUpDownMaxMin();
  }

});
$('#min-u-d').on('click', function()
{
  if(num.length === 5) {
  min(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
  allRes.upDownMaxMin[1] = sum;
  sumUpDownMaxMin();
  } else { // u slučaju da igrać ne odabere svih pet kockica dobiva najmanji/najveći zbroj
  $(this).attr('value', 30).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
  allRes.upDownMaxMin[1] = 30;
  sumUpDownMaxMin();
  }
});

$('#toak-u-d').on('click', function()
{
  threeOfAKind(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
  allRes.upDownSpecial[0] = sum;
  sumUpDownSpecial();
});

$('#straight-u-d').on('click', function()
{
  straight(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
  allRes.upDownSpecial[1] = sum;
  sumUpDownSpecial();
});

$('#full-u-d').on('click', function()
{
  fullHouse(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
  allRes.upDownSpecial[2] = sum;
  sumUpDownSpecial();
});

$('#poker-u-d').on('click', function()
{
  poker(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
  allRes.upDownSpecial[3] = sum;
  sumUpDownSpecial();
});

$('#jamb-u-d').on('click', function()
{
  jamb(num);
  $(this).attr('value', sum).prop('disabled', true).removeClass('u-d btn-results').css('background','');
  count++;
  resert();
  allRes.upDownSpecial[4] = sum;
  sumUpDownSpecial();
});
}

// funkcija zadužena za provođenje igre četvrtog stupca
function oneBell()
{

  if(togg === true)
  {
  
  removeCss();
  $('.call').prop('disabled', true).css('background', '');
  $('#one-call').prop('disabled', false).css('background', '#47AFFF').removeClass('call');
  $('.btn-results').prop('disabled', true);
  $('#dice-btn').prop('disabled', false);
  togg = false;
  }else{

        one(num);
        enableBtn();
        resert();
        addCss();
        $('#one-call').attr('value', sum).prop('disabled', true).css('background','');
        $('.call').prop('disabled', true);
        allRes.bellNum[0] = sum;
        sumNumBell();
        togg = true;
  }
} 

function twoBell()
{

  if(togg === true)
  {

  removeCss();
  $('.call').prop('disabled', true).css('background', '');
  $('#two-call').prop('disabled', false).css('background', '#47AFFF').removeClass('call');
  $('.btn-results').prop('disabled', true);
  $('#dice-btn').prop('disabled', false);
  togg = false;
  } else{
 
        two(num);
        enableBtn();
        resert();
        addCss();
        $('#two-call').attr('value', sum).prop('disabled', true).css('background','');
        $('.call').prop('disabled', true);
        allRes.bellNum[1] = sum;
        sumNumBell();
        togg = true;
  }
}

function threeBell()
{

  if(togg === true)
  {
  removeCss();
  $('.call').prop('disabled', true).css('background', '');
  $('.btn-results').prop('disabled', true);
  $('#three-call').prop('disabled', false).css('background', '#47AFFF').removeClass('call');
  $('#dice-btn').prop('disabled', false);
  togg = false;
  }else{
  
        three(num);
        enableBtn();
        resert();
        addCss();
        $('#three-call').attr('value', sum).prop('disabled', true).css('background','');
        $('.call').prop('disabled', true);
        allRes.bellNum[2] = sum;
        sumNumBell();
        togg = true;
        }
}

function fourBell()
{

  if(togg === true)
  {
  removeCss();
  $('.call').prop('disabled', true).css('background', '');
  $('.btn-results').prop('disabled', true);
  $('#four-call').prop('disabled', false).css('background', '#47AFFF').removeClass('call');
  $('#dice-btn').prop('disabled', false);
  togg = false;
  }else{
  
        four(num);
        enableBtn();
        resert();
        addCss();
        $('#four-call').attr('value', sum).prop('disabled', true).css('background','');
        $('.call').prop('disabled', true);
        allRes.bellNum[3] = sum;
        sumNumBell();
        togg = true;
        }
}

function fiveBell()
{

  if(togg === true)
  {
  removeCss();
  $('.call').prop('disabled', true).css('background', '');
  $('#five-call').prop('disabled', false).css('background', '#47AFFF').removeClass('call');
  $('.btn-results').prop('disabled', true);
  $('#dice-btn').prop('disabled', false);
  togg = false;
  }else{
  
        five(num);
        enableBtn();
        resert();
        addCss();
        $('#five-call').attr('value', sum).prop('disabled', true).css('background','');
        allRes.bellNum[4] = sum;
        sumNumBell();
        togg = true;
        }
}

function sixBell()
{

  if(togg === true)
  {
  removeCss();
  $('.call').prop('disabled', true).css('background', '');
  $('#six-call').prop('disabled', false).css('background', '#47AFFF').removeClass('call');
  $('.btn-results').prop('disabled', true);
  $('#dice-btn').prop('disabled', false);
  togg = false;
  }else{
  
        six(num);
        enableBtn();
        resert();
        addCss();
        $('#six-call').attr('value', sum).prop('disabled', true).css('background','');
        allRes.bellNum[5] = sum;
        sumNumBell();
        togg = true;
        }
}

function maxBell()
{

  if(togg === true)
  {
  removeCss();
  $('.call').prop('disabled', true).css('background', '');
  $('#max-call').prop('disabled', false).css('background', '#47AFFF').removeClass('call');
  $('.btn-results').prop('disabled', true);
  $('#dice-btn').prop('disabled', false);
  togg = false;
  }else if(togg === false && num.length === 5){
  
        max(num);
        enableBtn();
        resert();
        addCss();
        $('#max-call').attr('value', sum).prop('disabled', true).css('background','');
        allRes.bellMaxMin[0] = sum;
        sumBellMaxMin();
        togg = true;
        }
        // u slučaju da igrać ne odabere svih pet kockica dobiva najmanji/najveći zbroj
  else if(togg === false && num.length !== 5){
        max(num);
        enableBtn();
        resert();
        addCss();
        $('#max-call').attr('value', 5).prop('disabled', true).css('background','');
        allRes.bellMaxMin[0] = 5;
        sumBellMaxMin();
        togg = true;
        }
}

function minBell()
{

  if(togg === true)
  {
  removeCss();
  $('.call').prop('disabled', true).css('background', '');
  $('#min-call').prop('disabled', false).css('background', '#47AFFF').removeClass('call');
  $('.btn-results').prop('disabled', true);
  $('#dice-btn').prop('disabled', false);
  togg = false;
  }
  else if(togg === false && num.length === 5){
  
        min(num);
        enableBtn();
        resert();
        addCss();
        $('#min-call').attr('value', sum).prop('disabled', true).css('background','');
        allRes.bellMaxMin[1] = sum;
        sumBellMaxMin();
        togg = true;
        }
        // u slučaju da igrać ne odabere svih pet kockica dobiva najmanji/najveći zbroj
    else if(togg === false && num.length !== 5) { 
        min(num);
        enableBtn();
        resert();
        addCss();
        $('#min-call').attr('value', 30).prop('disabled', true).css('background','');
        allRes.bellMaxMin[1] = 30;
        sumBellMaxMin();
        togg = true;
  }
}

function toakBell()
{

  if(togg === true)
  {
  removeCss();
  $('.call').prop('disabled', true).css('background', '');
  $('#toak-call').prop('disabled', false).css('background', '#47AFFF').removeClass('call');
  $('.btn-results').prop('disabled', true);
  $('#dice-btn').prop('disabled', false);
  togg = false;
  }else{
  
        threeOfAKind(num);
        enableBtn();
        resert();
        addCss();
        $('#toak-call').attr('value', sum).prop('disabled', true).css('background','');
        allRes.bellSpecial[0] = sum;
        sumBellSpecial();
        togg = true;
        }
}

function straightBell()
{

  if(togg === true)
  {
  removeCss();
  $('.call').prop('disabled', true).css('background', '');
  $('#straight-call').prop('disabled', false).css('background', '#47AFFF').removeClass('call');
  $('.btn-results').prop('disabled', true);
  $('#dice-btn').prop('disabled', false);
  togg = false;
  }else{
  
        straight(num);
        enableBtn();
        resert();
        addCss();
        $('#straight-call').attr('value', sum).prop('disabled', true).css('background','');
        allRes.bellSpecial[1] = sum;
        sumBellSpecial();
        togg = true;
        }
}

function fullBell()
{

  if(togg === true)
  {
  removeCss();
  $('.call').prop('disabled', true).css('background', '');
  $('#full-call').prop('disabled', false).css('background', '#47AFFF').removeClass('call');
  $('.btn-results').prop('disabled', true);
  $('#dice-btn').prop('disabled', false);
  togg = false;
  }else{
  
        fullHouse(num);
        enableBtn();
        resert();
        addCss();
        $('#full-call').attr('value', sum).prop('disabled', true).css('background','');
        allRes.bellSpecial[2] = sum;
        sumBellSpecial();
        togg = true;
        }
}

function pokerBell()
{

  if(togg === true)
  {
  removeCss();
  $('.call').prop('disabled', true).css('background', '');
  $('#poker-call').prop('disabled', false).css('background', '#47AFFF').removeClass('call');
  $('.btn-results').prop('disabled', true);
  $('#dice-btn').prop('disabled', false);
  togg = false;
  }else{
  
        poker(num);
        enableBtn();
        resert();
        addCss();
        $('#poker-call').attr('value', sum).prop('disabled', true).css('background','');
        $('.call').prop('disabled', false);
        allRes.bellSpecial[3] = sum;
        sumBellSpecial();
        togg = true;
        }
}

function jambBell()
{

  if(togg === true)
  {
  removeCss();
  $('#jamb-call').prop('disabled', false).css('background', '#47AFFF').removeClass('call');
  $('.call').prop('disabled', true).css('background', '');
  $('.btn-results').prop('disabled', true);
  $('#dice-btn').prop('disabled', false);
  togg = false;
  }else{
        jamb(num);
        enableBtn();
        resert();
        addCss();
        $('#jamb-call').attr('value', sum).prop('disabled', true).css('background','');
        allRes.bellSpecial[4] = sum;
        sumBellSpecial();
        togg = true;
        }
}


// funckija koja omogučava pritisak na gumbe prva tri reda nakon 
// kruga u kojem smo upisali u 'call' stupac
function enableBtn()
{

  $('.up').prop('disabled', false);
  $('.down').prop('disabled', false);
  $('.u-d').prop('disabled', false);

}

function removeCss()
{
  $('.down').css('background','');
  $('.up').css('background','');
  $('.u-d').css('background','');
}

function addCss()
{
  $('.down').css('background','#47AFFF');
  $('.up').css('background','#47AFFF');
  $('.u-d').css('background','#47AFFF');
}


// slijede funkcije koje računaju i upisuju rezultat svih polja
function sumNumDown()
{
  let sumDown = allRes.downNum;
  let sum = sumDown.reduce((acc,current) => {
     return acc + current;
  },0);
  allRes.endResults[0] = sum;
  let sumP = document.getElementById('sum-num-down');
  sumP.textContent = sum;
}

function sumDownMaxMin()
{
   let sumDownMaxMin = allRes.downMaxMin;
   let sum = allRes.downMaxMin[0] - allRes.downMaxMin[1];
   allRes.endResults[1] = sum;
   let sumP = document.getElementById('max-min-down');
   sumP.textContent = sum;
}

function sumDownSpecial()
{
  let sumDownSpecial = allRes.downSpecial;
  let sum = sumDownSpecial.reduce((acc,current) => {
    return acc + current;
  },0);
  allRes.endResults[2] = sum;
  let sumP = document.getElementById('sum-down');
  sumP.textContent = sum;
}

function sumNumUp()
{
  let sumUp = allRes.upNum;
  let sum = sumUp.reduce((acc,current) => {
     return acc + current;
  },0);
  allRes.endResults[3] = sum;
  let sumP = document.getElementById('sum-num-up');
  sumP.textContent = sum;
}

function sumUpMaxMin()
{
   let sumUpMaxMin = allRes.upMaxMin;
   let sum = allRes.upMaxMin[0] - allRes.upMaxMin[1];
   allRes.endResults[4] = sum;
   let sumP = document.getElementById('max-min-up');
   sumP.textContent = sum;
}

function sumUpSpecial()
{
  let sumUpSpecial = allRes.upSpecial;
  let sum = sumUpSpecial.reduce((acc,current) => {
    return acc + current;
  },0);
  allRes.endResults[5] = sum;
  let sumP = document.getElementById('sum-up');
  sumP.textContent = sum;
}

function sumNumUpDown()
{
  let sumUpDown = allRes.upDownNum;
  let sum = sumUpDown.reduce((acc,current) => {
     return acc + current;
  },0);
  allRes.endResults[6] = sum;
  let sumP = document.getElementById('sum-num-up-down');
  sumP.textContent = sum;
}

function sumUpDownMaxMin()
{
   let sumUpDownMaxMin = allRes.upDownMaxMin;
   let sum = sumUpDownMaxMin[0] - sumUpDownMaxMin[1];
   allRes.endResults[7] = sum;
   let sumP = document.getElementById('max-min-up-down');
   sumP.textContent = sum;
}

function sumUpDownSpecial()
{
  let sumUpDownSpecial = allRes.upDownSpecial;
  let sum = sumUpDownSpecial.reduce((acc,current) => {
    return acc + current;
  },0);
  allRes.endResults[8] = sum;
  let sumP = document.getElementById('sum-up-down');
  sumP.textContent = sum;
}

function sumNumBell()
{
  let sumNumBell = allRes.bellNum;
  let sum = sumNumBell.reduce((acc,current) => {
     return acc + current;
  },0);
  allRes.endResults[9] = sum;
  let sumP = document.getElementById('sum-num-bell');
  sumP.textContent = sum;
}

function sumBellMaxMin()
{
   let sumBellMaxMin = allRes.bellMaxMin;
   let sum = sumBellMaxMin[0] - sumBellMaxMin[1];
   allRes.endResults[10] = sum;
   let sumP = document.getElementById('max-min-bell');
   sumP.textContent = sum;
}

function sumBellSpecial()
{
  let sumBellSpecial = allRes.bellSpecial;
  let sum = sumBellSpecial.reduce((acc,current) => {
    return acc + current;
  },0);
  allRes.endResults[11] = sum;
  let sumP = document.getElementById('sum-bell');
  sumP.textContent = sum;
}

function finalScore()
{
  
  let sumAll = allRes.endResults;
  let sum = sumAll.reduce((acc,current) => {
    return acc + current;
  },0);
  let sumP = document.getElementById('sum-final');
  sumP.textContent = sum;
}
