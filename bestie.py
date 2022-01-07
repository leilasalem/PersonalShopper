import json

with open('shopper.json', 'r') as f:
    shopper_dict = json.load(f)

d = {}
count = 0

for thing in shopper_dict:
    designer = thing["designer"]
    link = thing["href"]
    
    old = thing["oldprice"]
    right = old.index("US$") + 3
    left = old.index("(CAD")
    previous = float(old[right:left].strip().replace(',',''))
    
    new = thing["newprice"]
    wight = new.index("US$") + 3
    weft = new.index("(CAD")
    current = float(new[wight:weft].strip().replace(',',''))
    
    discount = int(((previous - current) / previous) * 100)

    if discount > 65:
        d[discount] = link
        count += 1
        print("designer: " + str(designer))
        print("discount: " + str(discount)) 
        print("url:")
        print(link)

print(str(count) + " treasures hiding xx")

f.close()
