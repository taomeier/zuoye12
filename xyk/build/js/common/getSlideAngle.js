define(function(){return function(a,t,n,r){var e=t-r,u=n-a,f=0;if(Math.abs(u)<2&&Math.abs(e)<2)return f;var h,i,M=(h=u,i=e,180*Math.atan2(i,h)/Math.PI);return-45<=M&&M<45?f=4:45<=M&&M<135?f=1:-135<=M&&M<-45?f=2:(135<=M&&M<=180||-180<=M&&M<-135)&&(f=3),f}});