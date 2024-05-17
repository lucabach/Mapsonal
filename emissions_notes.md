# Emissions

## Bike
Carbon footprint of **cycling** one kilometer is usually in the range of *16 to 50 grams CO2eq per km* depending on how efficiently you cycle and what you eat (https://ourworldindata.org/travel-carbon-footprint).  
We will thus use the constant $\frac{16 + 50}{2} [g/km] = 33 [g/km]$

## Train
**National rail** emits around *35 grams per kilometer*. (https://ourworldindata.org/travel-carbon-footprint)

## Car
The average CO2 emissions of new **cars** in Switzerland fell [...] to *123.6 grams per kilometre* (https://www.swissinfo.ch/eng/politics/swiss-car-emissions-targets-missed-despite-sanctions/46754886)

## Walking
Assume that **walking** emits *0.00 g per kilometer*

# Cost

## Bike
"A mid-range bike will cost between \$300 and \$1,000 [...]" (https://www.cyclingrevolution.com/how-much-should-i-spend-on-a-bike/, no data could be found on the Swiss market); according to a study conducted by the Swiss Federal Statistical Office in 2021, the average distance traveled by bicycle for working purposes is 13.6 km (one way), and 20.0 km (one way) for study and training purposes (pupils, apprentices and students) (https://www.bfs.admin.ch/bfs/en/home/statistics/mobility-transport/passenger-transport/commuting.html).
We can compute an average of the 2021 Swiss population by averaging these two: (13.6 + 20.0) km / 2 = 16.8 km.
We will take into consideration an average, mid-range bike cost of 650$, or roughly 570 CHF (currency exchange on 15.12.2023, 19:02). 
On top of that, one year of *road* bicycle maintenance comes with the following costs:
- Tires: $50 per tire
- Chain: $35
- Cables/housing: $10
- Cleats: $20
- Disc brake pads: $20
- Miscellaneous shop consumables: $50
- Cleaner for general wash: $5
- Degreaser: $5
- Chain lube: $20
- Tubeless sealant: $20

- Total: (50 * 2) + 35 + 10 + 20 + 20 + 50 + 5 + 5 + 20 + 20 = 285$ = 250 CHF (currency exchange on 15.12.2023, 19:09)
(https://www.theproscloset.com/blogs/news/how-to-plan-your-bike-maintenance-repair-budget)

"Self-employed persons had an average of 3.3 weeks of holiday in 2022",
"The number of weeks of holiday according to the contract varies with age: in 2022, full-time employees aged 20 to 49 had an average of 5.0 weeks of holiday, compared with 5.4 weeks for 15-19 year-olds and 5.6 weeks for those aged 50-64." (https://www.bfs.admin.ch/bfs/en/home/statistics/work-income/employment-working-hours/working-hours/holiday-leave.html) 
In 2022, 8.8% of the population was self-employed (https://www.bfs.admin.ch/bfs/en/home/statistics/work-income/employment-working-hours/economically-active-population/labour-market-status.html)
=> 
avg: ((3.3 * 8.8%) + ((5.0 + 5.4 + 5.6) * 92.2%)) / 4 =~ 3.76 weeks

365 [days/year] - ((3.76 [weeks of holiday / year] * 5 [work days/week]) + (2 [non-work days/week] * 52 [weeks/year])) = 242.2 [work days / year]

242.2 [work days / year] * (2 * 16.8 [one-way commute km]) = 8,137.92 [commute km / year]

"With reasonable care, a bike can last for 10 years or more." (https://bikeaton.com/expert-tips/how-long-do-bikes-last/). For a pessimistic estimate, let us assume a 10 year lifespan. Thus, the cost per year would be 570 [CHF] / 10 [years] = 57 [CHF/year]

Thus, the final estimate for average cost per kilometer becomes $\frac{(57.00 + 250.00) [CHF / year]}{8,137.92 [commute km / year]} = 0.0377 [CHF / km]$

## Train
- Westernmost point in Switzerland: "Chancy, douane"; Closet train station: "Genève"
- Easternmost point in Switzerland: "Müstair, cunfin"; Closet train station: "Zernerz"
- Northernmost point in Switzerland: "Bargen SH, Dorf"; Closet train station: "Schaffausen"
- Southernmost point in Switzerland: "Pedrinate, chiesa"; Closet train station: "Chiasso"


- Price to go from Genève to Zernez, 2nd class, no saver ticket: CHF 138.00
	- Distance: 444 km
	- Price per km: $\frac{138}{444} \approx 0.311 [CHF/km]$
- Price to go from Schaffausen to Chiasso, 2nd class, no saver ticket: CHF 88.00
	- Distance: 285 km
	- Price per km: $\frac{88}{285} \approx 0.309 [CHF/km]$
	
Average price per km: $\frac{0.311 + 0.309}{2} = 0.31 [CHF/km]$

## Car
- The cost per kilometer is *0.39 CHF/km* (https://www.carhelper.ch/blog/2019/01/25/mileage-costs-in-switzerland-what-your-car-will-really-cost-you/?lang=en)
- "The average kilometre cost for 2023 is CHF 0,75 per kilometre [...] if [owner keeps] the car for 10 years" (https://www.rydoo.com/compliance/switzerland/mileage-switzerland/, https://www.iamexpat.ch/expat-info/swiss-expat-news/how-much-does-it-cost-run-car-switzerland-2023, https://www.tcs.ch/de/testberichte-ratgeber/ratgeber/kontrollen-unterhalt/kilometerkosten.php, cost used by TCS to reimburse customers)

Given the overwhelming amount of evidence going for $0.75$ CHF/km, this is the constant we will be using.


## Walking
Walking is assumed to be free, since the only cost associated would be food, which is necessary for survival, and even if one drove or took public transportation instead, these costs would still exist, and are thus ignored since they don't change between means of transport.
