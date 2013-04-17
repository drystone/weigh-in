/* weigh-in: simple node, jquery and flot based weigh-in

Copyright © 2013 John Hedges

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the Free
Software Foundation; either version 2 of the License, or (at your option)
any later version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
more details.

You should have received a copy of the GNU General Public License along with
this program; if not, write to the Free Software Foundation, Inc., 51
Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA. */

$(function() {

  $('#weigh-in').css('display', 'none');

  $('#chart').click(function() {
    $('#weigh-in').css('display', 'block');
    $('#weight').focus();
  });
    
  $('#close').click(function(e) {
    e.preventDefault();
    $('#weigh-in').css('display', 'none');
  });

  $.ajax('weigh-in.json', {
    complete : function(r) {
      var weight = [], fat = [], waist = [];
      JSON.parse(r.responseText).forEach(function(r) {
        var time = r[0] * 1000;
        weight.push([time, r[1]]);
        fat.push([time, r[2]]);
        waist.push([time, r[3]]);
      });
      if (weight.length) {
        $('#weight').val(weight[weight.length-1][1]);
        $('#fat').val(fat[fat.length-1][1]);
        $('#waist').val(waist[waist.length-1][1]);
      }
      var plot = $.plot('#chart', [
        { label : 'weight', data : weight, yaxis : 1 }
      , { label : 'fat',    data : fat,    yaxis : 2 }
      , { label : 'waist',  data : waist,  yaxis : 3 }
      ], {
        xaxis : { mode : 'time' , timeformat : '%y/%m/%d' }
      });
      plot.getAxes().yaxis.options.color = plot.getData()[0].color;
      plot.getAxes().y2axis.options.color = plot.getData()[1].color;
      plot.getAxes().y3axis.options.color = plot.getData()[2].color;
      plot.setupGrid();
      plot.draw();
    }
  });
});
