const data = [  
  {
    where: {
      serial_mumber: "103"
    },
    update: {},
    create: {
      serial_mumber: "103",
      human_readable_name: "Webster",
      ipv4_address: "10.8.46.50",

      peripheral_device:{
        create:[
        {
          vendor: "tiniyDino",
          status: "ofline"
        },]
        },      
    }
  },

  {
    where: {
      serial_mumber: "8"
    },
    update: {},
    create: {
      serial_mumber: "8",
      human_readable_name: "Lalapop",
      ipv4_address: "10.8.50.108",

      peripheral_device:{
        create: [
        {
          vendor: "Dispik",
          status: "online"
        },]
        },      
    }
  },

  {
    where: {
      serial_mumber: "17"
    },
    update: {},
    create: {
      serial_mumber: "17",
      human_readable_name: "El Mio",
      ipv4_address: "10.8.150.17",

      peripheral_device:{
        create: [
        {
          vendor: "UfffQUeperiferico",
          status: "online"
        }, ]
        },      
    }
  }

  
];

module.exports = data;
