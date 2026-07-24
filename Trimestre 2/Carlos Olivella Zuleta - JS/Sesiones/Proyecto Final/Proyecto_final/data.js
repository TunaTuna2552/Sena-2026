export const componentes = [
    "Procesador", "Tarjeta gráfica", "Placa madre", "Fuente de poder", 
    "Chasis", "Monitor", "Mouse", "Teclado", "Audífonos", 
    "Micrófono", "Mouse pad", "Cables", "Adaptadores", "Pasta térmica", "Web cam", "Almacenamiento"
];

export const marcasGenericas = ["Corsair", "Logitech", "ASUS", "HyperX", "Razer", "MSI"];

export const datosComponentes = {
    "Procesador": {
        marcas: ["Intel Core", "AMD Ryzen"],
        "Intel Core": {
            modelos: ["3", "5", "7", "9", "Ultra 5", "Ultra 7", "Ultra 9"],
            generaciones: [
                "9na Gen (9000)", 
                "10ma Gen (10000)", 
                "11va Gen (11000)", 
                "12va Gen (12000)", 
                "13va Gen (13000)", 
                "14va Gen (14000)"
            ]
        },
        "AMD Ryzen": {
            modelos: ["3", "5", "7", "9"],
            generaciones: [
                "Serie 3000", 
                "Serie 5000", 
                "Serie 7000", 
                "Serie 8000", 
                "Serie 9000"
            ]
        }
    },
    "Tarjeta gráfica": {
        marcas: ["NVIDIA GeForce", "AMD Radeon"],
        "NVIDIA GeForce": {
            modelos: ["GTX 1650/1660", "RTX 3060/3070/3080", "RTX 4060/4070/4080/4090", "RTX 5070/5080/5090"],
            versiones: ["Estándar", "Ti", "Super"]
        },
        "AMD Radeon": {
            modelos: ["RX Serie 6000 (6600/6700)", "RX Serie 7000 (7600/7700/7800)", "RX Serie 8000"],
            versiones: ["Estándar", "XT", "XTX"]
        }
    },
    "Cables": {
        marcas: ["Ugreen", "Baseus", "Anker", "Genérico"],
        conexiones: ["HDMI a HDMI", "USB-A a USB-C", "Plug a Plug (Auxiliar 3.5mm)", "VGA a VGA", "USB-A a USB-A", "DisplayPort a DisplayPort"]
    },
    "Adaptadores": {
        marcas: ["Ugreen", "Baseus", "Anker", "Satechi", "Genérico"],
        tipos: ["Adaptador Simple", "Multi-puerto HUB"],
        "Adaptador Simple": [
            "Entrada USB-C a Salida USB-A",
            "Entrada USB-A a Salida USB-C",
            "Entrada HDMI a Salida VGA",
            "Entrada VGA a Salida HDMI",
            "Entrada USB-C a Salida HDMI",
            "Entrada HDMI a Salida USB-C"
        ],
        "Multi-puerto HUB": [
            "HUB USB-C (HDMI + 3x USB 3.0 + SD)",
            "HUB USB-A (4x USB 3.0)",
            "HUB USB-C con Puerto Ethernet (RJ45)",
            "Estación de Carga/HUB Escritorio Completa"
        ]
    },
    "Fuente de poder": {
        marcas: ["EVGA", "Corsair", "Seasonic", "Thermaltake"],
        intervalosVatios: ["400W - 550W", "600W - 750W", "800W - 1000W", "Más de 1000W"]
    },
    "Audífonos": {
        marcas: ["Sony", "JBL", "HyperX", "Logitech"],
        tipos: ["Diadema/Balaca", "Con cable", "Inalámbricos"]
    },
    "Micrófono": {
        marcas: ["Shure", "Blue Yeti", "Razer", "HyperX"],
        tipos: ["Con cable", "Inalámbrico"]
    },
    "Almacenamiento": {
        marcas: ["Kingston", "Samsung", "Crucial", "Western Digital"],
        tipos: ["RAM", "ROM"]
    }
};