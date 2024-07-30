library(tidyverse)
library(barplot3d)
library(plotrix)

#batsman data
bat <- read.csv("batsman.csv")
batsman <- bat$player
runs <- bat$runs
avg <- bat$avg
balls <- bat$Balls
#boundary percent = total boundaries * 100/total runs scored
#strike rate = total runs *100/total balls faced
for (i in 1:10) {
  strikerate[i] = ((runs[i]*100)/balls[i])
  boundper[i] = (((bat$X4s[i]*4+bat$X6s[i]*6)*100)/runs[i]) 
}
bat <- cbind(bat,boundper)
bat <- cbind(bat,strikerate)
#singles is total single runs taken by batsman
#dot percenttage = total dot balls *100/ total no. of balls faced
for (i in 1:10) {
  singles[i]= (runs[i] -(bat$X4s[i]*4)-(bat$X6s[i]*6))
  dotper[i] = ((balls[i]-(singles[i]+bat$X4s[i]+bat$X6s[i]))*100)/balls[i]}
bat <- cbind(bat,dotper)

#bowling stats
ball <- read.csv("bowler.csv")
wickets <- ball$wickets 
bowlers <- ball$bowler
economy <- ball$economy
SR <- ball$SR
averge <- ball$avg

# graph of runs scored by each batsman
barplot3d(rows=1,cols=10,z=runs
          ,theta=35,phi=50,topcolors=rainbow(10),sidecolors=rainbow(10),scalexy = 350,gridlines = TRUE,
          xlabels = batsman,gap = 0.5)

#graph of averages of each batsman
png(filename= "bat_avg.png")
viz2 <- ggplot(data=bat, aes(x=reorder(batsman,-avg),
                             y=avg, fill=batsman)) + geom_col(show.legend = FALSE)
viz2 + ggtitle("Average scores of individual batsman")+
  geom_text(aes(label = avg), vjust = -0.1)+
  theme(axis.text.x = element_text(angle = 60, hjust = 1),
        plot.title = element_text(hjust=0.5, colour="Black",size=20))
dev.off()

#graph of Strike rates of batsman
png(filename = "bat_Sr.png")
viz3 <- ggplot(data=bat, aes(x=reorder(batsman,-strikerate),
                             y=strikerate, fill=batsman)) + geom_col(show.legend = FALSE)
viz3 + ggtitle("Top 10 Strike Rates")+
  theme(axis.text.x = element_text(angle = 60, hjust = 1),
        plot.title = element_text(hjust=0.5, colour="Black",  size=20))
dev.off()

#graph of boundary percent vs dot percent
png(filename = "boundary_dot.png")
ggplot(dat=bat,aes(y = boundper, x = dotper, size = balls)) +
  geom_point(color = "red", alpha= 0.3) +
  geom_text(aes(label= batsman), vjust=-0.6, hjust= 0.6, color="#013369",
            position = position_dodge(0.8), size=3) +
  ylab("Boundary Percent") + xlab("Dot Percent") + ggtitle("Indian T20 batsman")
dev.off()

#graph of total wickets taken by each bowler
barplot3d(rows=1,cols=10,z=wickets
          ,theta=35,phi=50,topcolors=rainbow(10),sidecolors=rainbow(10),scalexy = 20,gridlines = TRUE,
          xlabels = bowlers,gap = 0.3)

#graph of economy rates of bowlers
png(filename = "ball_econ.png")
viz5 <- ggplot(data=ball, aes(x=reorder(bowlers,economy),
                            y=economy,
                            fill=bowlers)) + geom_col(show.legend = FALSE)
viz5 + ggtitle("Economy rate by individual bowlers")+
 geom_text(aes(label = economy), vjust = -0.1)+
theme(axis.text.x = element_text(angle = 60, hjust = 1),
     plot.title = element_text(hjust=0.5, colour="Black",size=20))
dev.off()

#graph of runs per wicket vs balls bowled per wicket of bowlers
png(filename = "ball_runs_wickets.png")
ggplot(data=ball,aes(y = SR, x = averge)) +
  geom_text(aes(label= bowlers), vjust=-0.5, hjust= 0.3, color="#013369",position = position_dodge(0.4), size=3) +
  geom_point(alpha = 0.4, col = "blue") +
  ggtitle("Indian T20 bowlers") +
  ylab("Balls bowled per wicket") + xlab("Runs conceded per wicket")
dev.off()

#graph of winning percentage against other countries
x <-  c(60,91.66,52.17,52.27,75,56.65,69.23,70.83,100)
lbl <-  c("Australia","Bangladesh","England","New Zealand","Pakistan","South Africa",
          "Sri Lanka","West Indies","Afghanistan")
png(file = "3d_pie_chart.jpg")
pie3D(x,labels = x, main = "Pie Chart of Countries ",col = rainbow(10),shade = 0.5)
legend("topright",lbl,fill=rainbow(10),cex = 0.65 )
dev.off()
