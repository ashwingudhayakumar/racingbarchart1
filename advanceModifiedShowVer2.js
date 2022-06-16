
//const goals=[{1910:[0,0,0,0]},{1930:[30, 20, 40, 50]},{1935:[35, 40, 70, 60]},{1950:[50,75,72,73]},{1955:[108, 76, 72, 79]},{1960:[110,100,108,106]},{1975:[120,110,117,112]},{1976:[130, 120, 140, 150]},{1990:[285, 250, 270, 210]},{2000:[285,325,372,353]}];



//years and goals of the player is mentioned here
const goals=[{1910:[0,0,0,0]},{1930:[30, 20, 40, 50]},{1935:[35, 40, 70, 60]},{1950:[50,75,72,73]},{1955:[70, 76, 72, 79]},{1960:[110,100,108,106]},{1975:[120,120,117,112]},{1986:[130, 120, 117, 150]},{1990:[185, 120, 117, 210]},{2000:[208,120,117,225]}];


//name of the plaer is mentioned here
const playerNames = ['neymar','sunil chethri','ronaldo','messi'];


//color for each players
const playerColors = ['pink', 'lightblue', 'lightgreen', 'yellow'];

//namespace for svg
const svgns = "http://www.w3.org/2000/svg";

//playerposition interms of group 
var playersPositionG= [];

//playerposition interms of path that assigned to group later
var playersPositionP=[];

//playerText in svg text element while the graph running the player names also running accordingly
var text = [];

//nearby playerText ,the goal text is showcasing it increase on each cycle if it is needed to be
var goalText=[];

//width of the svg bar
var width;

//initial =0
var initial=0;

//here we creating entire bar for each player before setted to scale as zero we take the actual width of the bar
for(let i=initial;i<playerNames.length;i++)
    {  
    playersPositionG[i] = document.createElementNS(svgns, "g");
    playersPositionG[i].setAttribute("class","shapegroup group");
    playersPositionP[i] = document.createElementNS(svgns, "path");
    playersPositionP[i].setAttribute("id",`path${i}`);
    playersPositionP[i].setAttribute("class",`path`);
    playersPositionP[i].setAttribute("d","M 0 0 L 512.181 0 L 512.181 48.085 0 48.085 0 0 z ");
    playersPositionP[i].setAttribute("fill-rule","evenodd");
    playersPositionP[i].setAttribute("fill-opacity","1");
    playersPositionP[i].setAttribute("fill",playerColors[`${i}`]);
    playersPositionP[i].setAttribute("stroke-dasharray","none");
    playersPositionP[i].setAttribute("stroke-linejoin","ROUND");
    playersPositionP[i].setAttribute("stroke-linecap","BUTT");
    playersPositionP[i].setAttribute("stroke-width","1");
    playersPositionG[i].append(playersPositionP[i]);
    text[i]= document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text[i].setAttribute('y',0);
    goalText[i]=document.createElementNS(svgns,'text');
    document.getElementById('SVG').append(text[i]);
    document.getElementById("SVG").append(playersPositionG[i]);
    if(i===initial){
        width=playersPositionG[i].getBBox().width;
    }
    $(playersPositionG[i]).attr("transform",`translate(200,0) scale(0,0) `);
    goalText[i].setAttribute('font-size','20px');
  //  playersPositionG[i].appendChild(goalText[i]);
  
    
    }



//here we take the each years in the data
var yearCollection=[];


goals.findIndex(function(goal,index){
    yearCollection.push(Math.floor(...Object.keys(goal)));
})

//years difference between last and first year
var yearDiff=yearCollection[yearCollection.length-1]-yearCollection[initial];

//what is the partition to the year on basis of year difference 
var wholeForEachYear=[];

//first year is always zero
wholeForEachYear[initial]=0;

//with yeardiff if we calculated between each consecutive years we get the whole for each years
for(let i=1;i<goals.length;i++){
    wholeForEachYear[i]=(wholeForEachYear[i-1]+(yearCollection[i]-yearCollection[i-1])/yearDiff);
}

//we don't want the 0 thats why slice is happenend
wholeForEachYear=wholeForEachYear.slice(1);


//all year goal data is actually inside the object thats why we turn into array
var allYearGoalData=[];


//all years goal data is push it over here
for(let i=initial;i<goals.length;i++){
    allYearGoalData.push(...Object.values(goals[i]));
}

//we dont want last year goal for calculation because it is like i and i+1 in that atlast we go into out of length that's why neglected here
allYearGoalData=allYearGoalData.slice(initial,-1);

//Diff betwen goals for consecutive years is initialize here
var DiffBtwGoalsOnConsecutiveYears=[];

//diff between goal data push it over here
goals.findIndex(function(goal,index){
    
    let temp=[];
    if(index!==goals.length-1){
    for(let i=initial;i<goals[index][Object.keys(goal)].length;i++){
        temp.push(goals[index+1][Object.keys(goals[index+1])][i]-goals[index][Object.keys(goal)][i]);
    }
    DiffBtwGoalsOnConsecutiveYears.push(temp);
    }
       
});

//this is for the iteration of whole for each year in animate
var i=initial;

//before position of each player is setted to zero
var beforePosition=[];
for(let j=initial;j<playerNames.length;j++){
     beforePosition.push(initial);
}


//bar animation is setted here
var animeDuration=0.03;

//started position for each bar is setted here then only the ending position is about in the animeDuration from the starting point
var animeCalculatedStartingPositionForEach=[];
for(let j=initial;j<playerNames.length;j++){
    animeCalculatedStartingPositionForEach.push(initial);
}

//before Needed To Fit for each bar

var beforeNeededToFitForEach=[];
for(let j=initial;j<playerNames.length;j++){
    beforeNeededToFitForEach.push(initial);
}

//before Text Y Positon why y means it gives you need to fit whereas x is common
var beforeTextYPosition=[];
for(let j=0;j<playerNames.length;j++){
    beforeTextYPosition.push(0);
}
//distribution is for starting after first input user given ,acts like a flag
var distribution=initial;

//this if for displaying the year in bottom
var yearText=document.createElementNS(svgns,'text');
yearText.setAttribute('x',600);
yearText.setAttribute('y',600);
yearText.setAttribute('font-size','20px');
document.getElementById('SVG').append(yearText);

//this is for separating translatex for calculation
var translatex=parseInt(playersPositionG[initial].getAttribute('transform').split(' ')[initial].split(',')[initial].slice(10));


//this is for lines that traveling in backwards while the front player goal increases


var svgLines=[];

svgLines[initial] = document.createElementNS('http://www.w3.org/2000/svg','line');
svgLines[initial].setAttribute('x1',width+translatex);
svgLines[initial].setAttribute('y1','20');
svgLines[initial].setAttribute('x2',width+translatex);
svgLines[initial].setAttribute('y2','500');
svgLines[initial].setAttribute("stroke", "black");

//this is for text same as lines

var svgText=[];

svgText[initial] = document.createElementNS('http://www.w3.org/2000/svg','text');
svgText[initial].setAttribute('x',width+translatex-15);
svgText[initial].setAttribute('y','15');

//this if for locating Text and line it is initially zero
var svgTextLineLocator=initial;


//on which user thought of seeing who reached the data first
var userFirstStartingData=50//parseInt(window.prompt("Enter starting value for animation"));

//this is for regular interval 
var userIntervalData=50//parseInt(window.prompt("on what interval you want to graph to be plotted"));

var lastHighestGoal=Object.values(goals[goals.length-1])[initial].sort((a,b)=> b-a)[initial];

//this gives us on which we want to put line
var svgTextLineArrayData=[];

//first data pushed
svgTextLineArrayData.push(userFirstStartingData);

var itr=1;

//interval data also pushed
while(itr){
    if(itr*userIntervalData<lastHighestGoal){
        svgTextLineArrayData.push(itr*userIntervalData);
    }
    else{
        break;
    }
    itr++;
}
svgTextLineArrayData.push(itr*userIntervalData);

//first line and text is appended
$("svg").append(svgLines[initial]);

svgText[initial].textContent=svgTextLineArrayData[svgTextLineLocator];
                                        
$("svg").append(svgText[initial]);

//here we go this part is to animate the bars

$(playersPositionG[initial]).animate
    (
        {value:1},
        {
            duration:10000,
            easing:"linear",
            step:function(now,fx)
            {
                if(wholeForEachYear[i]?wholeForEachYear[i]>now:initial)
                {
                    
                    yearText.textContent="Between "+" "+yearCollection[i]+"-"+yearCollection[i+1];

                    currTotalForEachPlayers=[];

                    for (let j = initial; j < allYearGoalData[i].length; j++) 
                    {
                        var forConversion=wholeForEachYear[i-1]?wholeForEachYear[i-1]:initial;
                        
                        var dif=wholeForEachYear[i]-forConversion;
                        
                        currTotalForEachPlayers[j] = parseFloat(allYearGoalData[i][j])+(parseFloat(DiffBtwGoalsOnConsecutiveYears[i][j])*((now-forConversion)/dif));
                        
                        if(currTotalForEachPlayers[j]>=userFirstStartingData){distribution=1}
                    }
                     let copy1 = currTotalForEachPlayers.slice();

                     copy1.sort(function(a, b) { return a - b });

                     let indexData = [];

                     for (let j = initial; j < copy1.length; j++)
                    {
                        indexData.push(currTotalForEachPlayers.indexOf(copy1[j]));
                    }
                    for(j=indexData.length-1,k=1;j>=initial;j--,k++)
                    {
                        
                        text[indexData[j]].setAttribute('x','80');
                        
                        text[indexData[j]].setAttribute('fill','black');
                        
                        text[indexData[j]].textContent=`${playerNames[indexData[j]]+" "+goalText[indexData[j]].textContent}`;

                        var neededToFit=k*100;
                        var neededToFitOfTextYPosition=(k*100)+30;

                        var scaleX;
                                    if(!distribution){
                                    
                                    scaleX=currTotalForEachPlayers[indexData[j]]/userFirstStartingData;
                                    }
                                    else{
                                    if(j===indexData.length-1){
                                        scaleX=1;
                                    }
                                    else{
                                    scaleX=((1/currTotalForEachPlayers[indexData[indexData.length-1]])*currTotalForEachPlayers[indexData[j]]);
                                    }
                                    }

                                   
                                     if(distribution)
                                     {

                                        if(currTotalForEachPlayers[indexData[indexData.length-1]]>svgTextLineArrayData[svgTextLineLocator] &&svgTextLineArrayData[svgTextLineLocator])
                                        {
                                            svgTextLineLocator++;
                                            
                                            svgLines[svgTextLineLocator] = document.createElementNS('http://www.w3.org/2000/svg','line');
                                            
                                            svgLines[svgTextLineLocator].setAttribute('x1',width+200);
                                            
                                            svgLines[svgTextLineLocator].setAttribute('y1','20');
                                            
                                            svgLines[svgTextLineLocator].setAttribute('x2',width+200);
                                            
                                            svgLines[svgTextLineLocator].setAttribute('y2','500');
                                            
                                            svgLines[svgTextLineLocator].setAttribute("stroke", "black");

                                            svgText[svgTextLineLocator] = document.createElementNS('http://www.w3.org/2000/svg','text');
                                            
                                            svgText[svgTextLineLocator].setAttribute('x',width+translatex-15);
                                            
                                            svgText[svgTextLineLocator].setAttribute('y','15');
                                            
                                            svgText[svgTextLineLocator].textContent=Math.ceil(currTotalForEachPlayers[indexData[indexData.length-1]]);

                                            $("svg").append(svgLines[svgTextLineLocator]);
                                            
                                            $("svg").append(svgText[svgTextLineLocator]);
    
                                        }
                                        else if(currTotalForEachPlayers[indexData[indexData.length-1]]<svgTextLineArrayData[svgTextLineLocator] &&svgTextLineArrayData[svgTextLineLocator])
                                        {
                                            svgText[svgTextLineLocator].textContent=Math.ceil(currTotalForEachPlayers[indexData[indexData.length-1]]);
                                            
                                            var temp=svgTextLineLocator;
                                            
                                            temp--;
                                            while(temp!==-1){
                                                var topplayergoal=currTotalForEachPlayers[indexData[indexData.length-1]];
                                                
                                                var topplayerscale=width;
                                                
                                                
                                                svgLines[temp].setAttribute('x1',translatex+((topplayerscale/topplayergoal)*svgTextLineArrayData[temp]));
                                                
                                                svgLines[temp].setAttribute('x2',translatex+((topplayerscale/topplayergoal)*svgTextLineArrayData[temp]));
                                                
                                                svgText[temp].setAttribute('x',translatex+(((topplayerscale-15)/topplayergoal)*svgTextLineArrayData[temp]));
                                                
                                                svgText[temp].textContent=svgTextLineArrayData[temp];
                                                
                                                temp--;
                                            }

                                        }

                                        
                                     }
                                   
                                    goalText[indexData[j]].textContent=Math.ceil(currTotalForEachPlayers[indexData[j]]);
                                          

                        if(beforeNeededToFitForEach[indexData[j]]===neededToFit)
                        
                        {

                            if(beforePosition[indexData[j]]<neededToFit)
                        
                            {

                                    
         
                                if(now>animeCalculatedStartingPositionForEach[indexData[j]] && (now-animeCalculatedStartingPositionForEach[indexData[j]])<=animeDuration)
                                {
                                    var before=beforePosition[indexData[j]];
                                    
                                    var need=neededToFit;
                                    
                                    var diff=need-before;
                    
                                    var percentage=(now-animeCalculatedStartingPositionForEach[indexData[j]])/animeDuration;
                                    
                                    var translateY=before+(diff*percentage);

                                    var beforeTextY=beforeTextYPosition[indexData[j]];
                                    
                                    var needTOfY=neededToFitOfTextYPosition;
                                    
                                    var diffY=needTOfY-beforeTextY;
                                    
                                    var setAttributeY=beforeTextY+(diffY*percentage);
                                    
                                    text[indexData[j]].setAttribute('y',`${setAttributeY}`);
                                    
                                    $(playersPositionG[indexData[j]]).attr("transform",`translate(${200},${translateY}) scale(${scaleX},1)`);
                                   

                                }

                                else
                                {
                                    
                                    text[indexData[j]].setAttribute('y',`${neededToFitOfTextYPosition}`);
                                   
                                    $(playersPositionG[indexData[j]]).attr("transform",`translate(${200},${neededToFit}) scale(${scaleX},1)`);

                                }

                            }

                            else if(beforePosition[indexData[j]]>neededToFit )
                        
                            {
                                    
                                if(now>animeCalculatedStartingPositionForEach[indexData[j]] && (now-animeCalculatedStartingPositionForEach[indexData[j]]<animeDuration) )
                            
                                    {
                                        var before=beforePosition[indexData[j]];
                                        
                                        var need=neededToFit;
                                        
                                        var diff=before-need;
                                        
                                        var percentage=(now-animeCalculatedStartingPositionForEach[indexData[j]])/animeDuration;
                                        
                                        var translateY=before-(diff*percentage);

                                        var beforeTextY=beforeTextYPosition[indexData[j]];
                                        
                                        var needTOfY=neededToFitOfTextYPosition;
                                        
                                        var diffY=beforeTextY-needTOfY;
                                        
                                        var setAttributeY=beforeTextY-(diffY*percentage);
                                    
                                        
                                        
                                    text[indexData[j]].setAttribute('y',`${setAttributeY}`);
                                           
                                        
                                    $(playersPositionG[indexData[j]]).attr("transform",`translate(${200},${translateY}) scale(${scaleX},1)`);
                                 
                                    
                                    }

                                else
                                    
                                    {
                                       
                                    text[indexData[j]].setAttribute('y',`${neededToFitOfTextYPosition}`);
                                   
                                    $(playersPositionG[indexData[j]]).attr("transform",`translate(${200},${neededToFit}) scale(${scaleX},1)`);
                                   
                                    }
                                    

                            }
                        
                            else
                            
                            {

                              
                                    text[indexData[j]].setAttribute('y',`${neededToFitOfTextYPosition}`);
                                   
                                    $(playersPositionG[indexData[j]]).attr("transform",`translate(${200},${neededToFit}) scale(${scaleX},1)`);
                                 
                            }
                           

                        }

                        else
                        
                        {
                               

                               animeCalculatedStartingPositionForEach[indexData[j]]=now;

                                let totalTranslateAndScale=playersPositionG[indexData[j]].getAttribute('transform').split(" ");
                     
                                let onlyTranslate=totalTranslateAndScale[initial];
                          
                                beforePosition[indexData[j]]=onlyTranslate.slice(14,-1);
    
                                beforePosition[indexData[j]]=parseFloat(beforePosition[indexData[j]]);

                                beforeTextYPosition[indexData[j]]=parseFloat(text[indexData[j]].getAttribute('y'));

                                

                             
                        }

                            beforeNeededToFitForEach[indexData[j]]=neededToFit;
                    }
                        
                    
                    
                    
                }
                else{
                    
                    i++;

                }

            },complete:()=>yearText.textContent="In "+yearCollection[i]
        }
    ,)

    
