-- MySQL dump 10.13  Distrib 8.0.14, for Win64 (x86_64)
--
-- Host: localhost    Database: bdrefaccionaria
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cliente` (
  `rfc_cliente` varchar(50) NOT NULL,
  `razon_social` varchar(100) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `domicilio` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`rfc_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES ('AAAAA','Jorge Miguel','hjhj',NULL,'hjh','jj','jk'),('HBL12345','Humberto Bernal Lopez','Ags','Ags','Pino Suarez #200','449-100-35-45','Humbertobl@gmail.com'),('jhkhj','jh','hj',NULL,'jhhj','kjk','jkh'),('JMGR','Juan Manuel Gomez Reynozo','Ags','Ags','Heroes de Nacozari #230','449-789-52-96','JuanM@gmail.com'),('JMIO12345','Jorge Miguel Ibarra Ortiz','Ags','Ags','Carme de Luna Sevilla #210','496-102-36-34','jorgemgibarraortiz@gmail.com'),('LMEM','Luis Manuel','Ags',NULL,'Ags','87997998','Manzano@gmail.com'),('RAC','Rolando Aguilar Calvillo','Ags',NULL,'Pino Suarez #230','449-908-54-68','Rolando@gmail.com'),('RSH12345','Ricardo Solis Herrera','Aguascalientes','Aguascalientes','Lopez Mateos #200','567-548-89-96','Rick@gmail.com'),('TALLER','Taller Mecanico AutoCar','Aguascalientes','Aguascalientes','Lopez Mateos #210','446-254-63-87','AutoCar@gmail.com');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `detalle_pedido` (
  `id_pedido` int NOT NULL,
  `id_refaccion` int NOT NULL,
  `cantidad_surtir` int DEFAULT NULL,
  PRIMARY KEY (`id_pedido`,`id_refaccion`),
  KEY `FK_detallepedido_refaccion_idx` (`id_refaccion`),
  CONSTRAINT `FK_detalle_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidofabrica` (`id_pedido`),
  CONSTRAINT `FK_detallepedido_refaccion` FOREIGN KEY (`id_refaccion`) REFERENCES `refaccion` (`id_refaccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedido`
--

LOCK TABLES `detalle_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_pedido` DISABLE KEYS */;
INSERT INTO `detalle_pedido` VALUES (6,1,3),(6,4,2),(7,1,10),(7,3,20),(8,1,100),(8,3,20),(9,2,10),(9,3,20),(9,4,1),(10,1,1000),(10,3,20);
/*!40000 ALTER TABLE `detalle_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `empleado` (
  `id_empleado` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `domicilio` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `fecha_nacimiento` varchar(10) DEFAULT NULL,
  `cp` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (1,'Jazmin Del Rosario','Aguascalientes','Aguascalientes','Heroes de Nacozari #30','449-230-90-90','JazzMarin@gmail.com','040998','45675'),(2,'admin','Jalisco','Ojuelos','Lazaro Cardenaz#9','496-102-36-34','admin','admin','47540'),(3,'Jorge Miguel Ibarra Ortiz','Jalisco','Ojuelos','Carmen de Luna Sevilla #210','496-102-36-39','jorgemgibarraortiz@gmail.com','04091997','47545'),(5,'Jesus Humberto Bernal Lopez','Aguascalientes','Aguascalientes','Pino Suarez #210','449-254-69-78','Humberto@gmail.com','01101998','67549');
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura_pedidos`
--

DROP TABLE IF EXISTS `factura_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `factura_pedidos` (
  `idFactura` int NOT NULL,
  `fecha_Surtido` datetime DEFAULT NULL,
  `Total_Pago` decimal(10,2) DEFAULT NULL,
  `id_pedido` int DEFAULT NULL,
  PRIMARY KEY (`idFactura`),
  KEY `FK_pedidotaller_factura_idx` (`id_pedido`),
  CONSTRAINT `FK_pedidotaller_factura` FOREIGN KEY (`id_pedido`) REFERENCES `pedidofabrica` (`id_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura_pedidos`
--

LOCK TABLES `factura_pedidos` WRITE;
/*!40000 ALTER TABLE `factura_pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `factura_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura_taller`
--

DROP TABLE IF EXISTS `factura_taller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `factura_taller` (
  `idfactura` int NOT NULL AUTO_INCREMENT,
  `fecha_surtido` datetime DEFAULT NULL,
  `costo_surtido` decimal(10,2) DEFAULT NULL,
  `id_pedido` int DEFAULT NULL,
  `id_empleado` int DEFAULT NULL,
  PRIMARY KEY (`idfactura`),
  KEY `FK_pedido_taller_idx` (`id_pedido`),
  KEY `FK_pedido_empleado_idx` (`id_empleado`),
  CONSTRAINT `FK_pedido_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`),
  CONSTRAINT `FK_pedido_taller` FOREIGN KEY (`id_pedido`) REFERENCES `pedidotaller` (`id_pedido`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura_taller`
--

LOCK TABLES `factura_taller` WRITE;
/*!40000 ALTER TABLE `factura_taller` DISABLE KEYS */;
INSERT INTO `factura_taller` VALUES (10,'2020-06-02 19:41:05',3014.65,1,3),(11,'2020-06-02 18:19:29',3014.65,1,3);
/*!40000 ALTER TABLE `factura_taller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago_pedidotaller`
--

DROP TABLE IF EXISTS `pago_pedidotaller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pago_pedidotaller` (
  `idPago` int NOT NULL AUTO_INCREMENT,
  `fecha` varchar(100) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `idPedido` int DEFAULT NULL,
  PRIMARY KEY (`idPago`),
  KEY `FK_PAGO_PEDIDO_idx` (`idPedido`),
  CONSTRAINT `FK_PAGO_PEDIDO` FOREIGN KEY (`idPedido`) REFERENCES `pedidotaller` (`id_pedido`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago_pedidotaller`
--

LOCK TABLES `pago_pedidotaller` WRITE;
/*!40000 ALTER TABLE `pago_pedidotaller` DISABLE KEYS */;
INSERT INTO `pago_pedidotaller` VALUES (1,'2020-06-02 0:45:9',250.85,1);
/*!40000 ALTER TABLE `pago_pedidotaller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidofabrica`
--

DROP TABLE IF EXISTS `pedidofabrica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pedidofabrica` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `id_empleado` int NOT NULL,
  `estatus_pago` varchar(2) DEFAULT NULL,
  `status_envio` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `fk_PedidoFabrica_Empleado1_idx` (`id_empleado`),
  CONSTRAINT `fk_PedidoFabrica_Empleado1` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidofabrica`
--

LOCK TABLES `pedidofabrica` WRITE;
/*!40000 ALTER TABLE `pedidofabrica` DISABLE KEYS */;
INSERT INTO `pedidofabrica` VALUES (6,'2020-06-06 17:12:35',3,'NO','NO'),(7,'2020-06-06 17:29:51',3,'NO','NO'),(8,'2020-06-06 17:58:20',3,'NO','NO'),(9,'2020-06-06 17:59:24',3,'NO','NO'),(10,'2020-06-06 18:01:08',3,'SI','SI');
/*!40000 ALTER TABLE `pedidofabrica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidotaller`
--

DROP TABLE IF EXISTS `pedidotaller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pedidotaller` (
  `id_pedido` int NOT NULL,
  `fecha` varchar(100) DEFAULT NULL,
  `estatus_pago` varchar(1) DEFAULT NULL,
  `rfc_cliente` varchar(50) NOT NULL,
  `status_surtido` varchar(1) DEFAULT NULL,
  `total_pagar` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `fk_pedidotaller_cliente_idx` (`rfc_cliente`),
  CONSTRAINT `fk_pedidotaller_cliente` FOREIGN KEY (`rfc_cliente`) REFERENCES `cliente` (`rfc_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidotaller`
--

LOCK TABLES `pedidotaller` WRITE;
/*!40000 ALTER TABLE `pedidotaller` DISABLE KEYS */;
INSERT INTO `pedidotaller` VALUES (1,'2020-06-09 03:19:25','N','TALLER','S',5250.85),(2,'2020-07-03 02:35:24','N','TALLER','N',1520.25),(3,'2020-05-21 03:24:11','N','TALLER','N',5800.45);
/*!40000 ALTER TABLE `pedidotaller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prueba`
--

DROP TABLE IF EXISTS `prueba`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `prueba` (
  `idTable` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTable`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prueba`
--

LOCK TABLES `prueba` WRITE;
/*!40000 ALTER TABLE `prueba` DISABLE KEYS */;
INSERT INTO `prueba` VALUES (1,'Jorge Miguel','Ibarra Ortiz'),(2,'Jorge Miguel','Ibarra Ortiz'),(3,'Jorge Miguel','Ibarra Ortiz'),(4,'Jorge Miguel','Ibarra Ortiz'),(5,'Humberto','Bernal');
/*!40000 ALTER TABLE `prueba` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refaccion`
--

DROP TABLE IF EXISTS `refaccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `refaccion` (
  `id_refaccion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(300) DEFAULT NULL,
  `Descripcion` text,
  `Precio_compra` decimal(10,2) DEFAULT NULL,
  `precio_venta` decimal(10,2) DEFAULT NULL,
  `existencia` int DEFAULT NULL,
  `imagen` varchar(200) DEFAULT NULL,
  `categoria` varchar(45) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id_refaccion`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refaccion`
--

LOCK TABLES `refaccion` WRITE;
/*!40000 ALTER TABLE `refaccion` DISABLE KEYS */;
INSERT INTO `refaccion` VALUES (1,'Filtro de aire gonher ga323m','FILTRO DE AIRE GONHER PARA PONTIAC MATIZ G2 1L L4 06-10 ',169.00,220.92,29,'Amortiguador de Gas 2007-2012.png','Afinacion','N'),(2,'Filtro de aire gonher ga323m','FILTRO DE AIRE GONHER PARA PONTIAC MATIZ G2 1L L4 06-10 ',169.00,220.92,30,'Bomba de Aceite 2007-1013.png','Afinacion','S'),(3,'Manguera para frenos lusac lc38893','MANGUERA PARA FRENOS LUSAC PARA CHRYSLER DODGE DAKOTA 91-96 DEL IZQ USA',299.00,407.73,4,'flecha Homocinetica Delantera 2007-2012.png','Frenos','S'),(4,'Amortiguador excel-g kyb 332502k','AMORT EXCEL KYB DOD I10 12-13 AMORTIGUADOR EXCEL-G KYB DELANTERO DERECHO E IZQUIERDO PARA DODGE I10 1.1L L4 2012-2013',1001.00,1800.11,100,'Cilindro de frenos 2007- 2011.png','Suspension','S'),(5,'Manguera para frenos lusac lc38893','MANGUERA PARA FRENOS LUSAC PARA CHRYSLER DODGE DAKOTA 91-96 DEL IZQ USA',299.00,407.73,2,'flecha Homocinetica Delantera 2007-2012.png','Frenos','N'),(6,'Manguera para frenos lusac lc38893','MANGUERA PARA FRENOS LUSAC PARA CHRYSLER DODGE DAKOTA 91-96 DEL IZQ USA',299.00,407.73,27,'flecha Homocinetica Delantera 2007-2012.png','Frenos','N'),(7,'filtro de aire gp1 5496gp','filtro de aire gp1 para chevrolet chevy 1.6l l4 1994-2003- pick up 1.6l l4 1994-2003',125.00,452.00,20,'filtro de aire gp1 5496gp.jpg','Afinacion','S'),(8,'filtro de aire gonher ga323m','filtro de aire gonher para pontiac matiz g2 1l l4 06-10 ',258.00,878.55,40,'filtro de aire gonher ga323m.jpg','Afinacion','S'),(9,'bujia de encendido champion 3407','bujia de encendido champion para e150 club wagon 4.2l l6 1995-1995 e250 club wagon 4.2l v6 1998-1999 e150 econoline van 4.2l v6 2001-2003 e150 econoline van 4.2l v6 1998-2000 econoline wagon 4.2l v6 2004-2004 4.2l v6 1999-2004 escort 1.9l l4 1994-199',125.25,200.00,80,'bujia de encendido champion 3407.jpg','Afinacion','S'),(10,'bujia de encendido ngk c7hsa','bujia de encendido ngk para big dog motorcycle boxer 98-01/kymco motorcycle people 125 99-02',45.00,87.90,100,'bujia de encendido ngk c7hsa.jpg','Afinacion','S'),(11,'balata freno de disco remsa 7106ad257rms','balata freno de disco delantero ford ghia 1991-1994 ford topaz 1994-1994, izquierda y derecha',127.45,358.52,24,'balata freno de disco remsa 7106ad257rms.jpg','Frenos','S'),(12,'balata freno de disco remsa 7111d145arms','balata freno de disco delantero 560sel 300se 380sel 1989-1991, lado derecho e izquierdo',325.50,689.42,33,'balata freno de disco remsa 7111d145arms.jpg','Frenos','S'),(13,'manguera para frenos lusac lc1126','manguera para frenos lusac para vam del jeep cj-5 70-77 willis cj5d 74-77',254.48,690.45,30,'manguera para frenos lusac lc1126.PNG','Frenos','S'),(14,'amortiguador excel-g kyb 332502k','amort excel kyb dod i10 12-13 amortiguador excel-g kyb delantero derecho e izquierdo para dodge i10 1.1l l4 2012-2013',1000.50,1800.45,30,'amortiguador excel-g kyb 332502k.PNG','Suspension','S'),(15,'amortiguador hidraulico boge 35020','amoriguador hidraulico boge trasero para nissan urvan 1999-2007- pickup 4x2 1986-1992- dodge ram 50 1979-1991- chevrolet p20 1968-1989- toyota pickup 1984-1994, lado derecgo e izquierdo',290.50,500.35,25,'amortiguador hidraulico boge 35020.jpg','Suspension','S');
/*!40000 ALTER TABLE `refaccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refaccion_pedidotaller`
--

DROP TABLE IF EXISTS `refaccion_pedidotaller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `refaccion_pedidotaller` (
  `id_refaccion` int NOT NULL,
  `id_pedido` int NOT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`id_refaccion`,`id_pedido`),
  KEY `FK_pedido_idx` (`id_pedido`),
  CONSTRAINT `FK_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidotaller` (`id_pedido`),
  CONSTRAINT `FK_refaccion_pedido` FOREIGN KEY (`id_refaccion`) REFERENCES `refaccion` (`id_refaccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refaccion_pedidotaller`
--

LOCK TABLES `refaccion_pedidotaller` WRITE;
/*!40000 ALTER TABLE `refaccion_pedidotaller` DISABLE KEYS */;
INSERT INTO `refaccion_pedidotaller` VALUES (1,1,2),(2,1,4),(2,3,4),(5,1,2),(6,1,3),(10,2,3),(10,3,2),(11,2,2),(11,3,1),(14,2,6),(15,2,1),(15,3,9);
/*!40000 ALTER TABLE `refaccion_pedidotaller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `venta` (
  `id_venta` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `id_empleado` int NOT NULL,
  `rfc_cliente` varchar(50) NOT NULL,
  PRIMARY KEY (`id_venta`),
  KEY `fk_Venta_Empleado1_idx` (`id_empleado`),
  KEY `fk_Venta_Cliente_idx` (`rfc_cliente`),
  CONSTRAINT `fk_Venta_Cliente` FOREIGN KEY (`rfc_cliente`) REFERENCES `cliente` (`rfc_cliente`),
  CONSTRAINT `fk_Venta_Empleado1` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (30,'2020-01-25',3115.62,1,'JMGR'),(37,'2020-01-02',674.81,1,'RAC'),(38,'2020-02-02',46.16,1,'AAAAA'),(39,'2020-02-02',46.16,1,'jhkhj'),(40,'2020-03-02',46.16,1,'AAAAA'),(41,'2020-03-02',46.16,1,'jhkhj'),(42,'2020-04-02',46.16,1,'AAAAA'),(43,'2020-04-02',46.16,1,'HBL12345'),(44,'2020-05-02',46.16,1,'HBL12345'),(45,'2020-05-02',46.16,1,'HBL12345'),(46,'2020-05-02',46.16,1,'jhkhj'),(47,'2020-05-02',46.16,1,'jhkhj'),(48,'2020-05-02',46.16,1,'JMIO12345'),(49,'2020-06-02',267.08,1,'JMGR'),(50,'2020-06-09',895.73,1,'JMIO12345'),(51,'2020-06-09',628.65,1,'HBL12345'),(53,'2020-06-12',670.00,1,'AAAAA'),(54,'2020-06-18',500.05,1,'JMGR'),(55,'2020-07-30',220.92,1,'JMGR'),(56,'2020-06-30',220.92,1,'JMIO12345'),(57,'2020-07-30',220.92,1,'JMGR'),(58,'2020-07-30',441.84,1,'RAC'),(59,'2020-06-30',441.84,1,'TALLER'),(60,'2020-06-30',441.84,1,'RAC'),(61,'2020-07-02',628.65,1,'JMGR');
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta_detalle`
--

DROP TABLE IF EXISTS `venta_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `venta_detalle` (
  `id_venta` int NOT NULL,
  `id_refaccion` int NOT NULL,
  `total_articulos` int DEFAULT NULL,
  PRIMARY KEY (`id_venta`,`id_refaccion`),
  KEY `FK_venta_refaccion_idx` (`id_refaccion`),
  CONSTRAINT `FK_venta` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id_venta`),
  CONSTRAINT `FK_venta_refaccion` FOREIGN KEY (`id_refaccion`) REFERENCES `refaccion` (`id_refaccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta_detalle`
--

LOCK TABLES `venta_detalle` WRITE;
/*!40000 ALTER TABLE `venta_detalle` DISABLE KEYS */;
INSERT INTO `venta_detalle` VALUES (30,1,2),(30,3,3),(30,4,1),(37,1,1),(37,2,1),(37,3,1),(38,1,1),(39,1,1),(40,1,1),(41,1,1),(42,1,1),(43,1,1),(44,1,1),(45,1,1),(46,1,1),(47,1,1),(48,1,1),(49,1,1),(49,2,1),(50,1,1),(50,2,2),(50,3,1),(51,2,1),(51,3,1),(54,1,2),(54,3,1),(55,1,1),(56,1,1),(57,1,1),(60,2,2),(61,1,1),(61,3,1);
/*!40000 ALTER TABLE `venta_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventasp`
--

DROP TABLE IF EXISTS `ventasp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ventasp` (
  `id_venta` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `costo` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_venta`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventasp`
--

LOCK TABLES `ventasp` WRITE;
/*!40000 ALTER TABLE `ventasp` DISABLE KEYS */;
INSERT INTO `ventasp` VALUES (6,'2003-06-21',89.87),(7,'1998-06-21',89.87),(8,'2020-06-21',89.87),(9,'2003-06-21',89.87),(10,'2025-06-21',89.87),(11,'2020-04-22',46.16),(12,'2020-04-22',46.16),(13,'2020-05-22',46.16),(14,'2020-05-22',500.05),(15,'2020-05-25',46.16),(16,'2020-05-25',46.16),(17,'2020-05-25',453.89);
/*!40000 ALTER TABLE `ventasp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bdrefaccionaria'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-03 13:01:24
