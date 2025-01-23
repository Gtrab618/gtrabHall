import React, { useState } from 'react';

// Tipos para Producto y Subproducto
interface SubProducto {
  id: number;
  nombre: string;
}

interface Producto {
  id: number;
  nombre: string;
  subproductos: SubProducto[];
}

interface SubProductoProps {
  subproducto: SubProducto;
  onChange: (subproducto: SubProducto) => void;
  onRemove: (id: number) => void;
}

interface ProductoProps {
  producto: Producto;
  onChange: (producto: Producto) => void;
  onRemove: (id: number) => void;
}

const SubProductoComponent: React.FC<SubProductoProps> = ({ subproducto, onChange, onRemove }) => (
  <div>
    <input
      type="text"
      value={subproducto.nombre}
      onChange={(e) => onChange({ ...subproducto, nombre: e.target.value })}
      placeholder="Nombre del subproducto"
    />
    <button onClick={() => onRemove(subproducto.id)}>Eliminar</button>
  </div>
);

const ProductoComponent: React.FC<ProductoProps> = ({ producto, onChange, onRemove }) => {
  const agregarSubProducto = () => {
    const nuevoSubProducto: SubProducto = {
      id: Date.now(),
      nombre: '',
    };
    onChange({ ...producto, subproductos: [...producto.subproductos, nuevoSubProducto] });
  };

  const actualizarSubProducto = (subproductoActualizado: SubProducto) => {
    const subproductosActualizados = producto.subproductos.map((sp) =>
      sp.id === subproductoActualizado.id ? subproductoActualizado : sp
    );
    onChange({ ...producto, subproductos: subproductosActualizados });
  };

  const eliminarSubProducto = (id: number) => {
    const subproductosFiltrados = producto.subproductos.filter((sp) => sp.id !== id);
    onChange({ ...producto, subproductos: subproductosFiltrados });
  };

  return (
    <div>
      <h3>Producto</h3>
      <input
        type="text"
        value={producto.nombre}
        onChange={(e) => onChange({ ...producto, nombre: e.target.value })}
        placeholder="Nombre del producto"
      />
      <h4>Subproductos</h4>
      {producto.subproductos.map((subproducto) => (
        <SubProductoComponent
          key={subproducto.id}
          subproducto={subproducto}
          onChange={actualizarSubProducto}
          onRemove={eliminarSubProducto}
        />
      ))}
      <button onClick={agregarSubProducto}>Agregar Subproducto</button>
      <button onClick={() => onRemove(producto.id)}>Eliminar Producto</button>
    </div>
  );
};

const GestorProductos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  const agregarProducto = () => {
    const nuevoProducto: Producto = {
      id: Date.now(),
      nombre: '',
      subproductos: [],
    };
    setProductos((prevProductos) => [...prevProductos, nuevoProducto]);
  };

  const actualizarProducto = (productoActualizado: Producto) => {
    const productosActualizados = productos.map((p) =>
      p.id === productoActualizado.id ? productoActualizado : p
    );
    setProductos(productosActualizados);
  };

  const eliminarProducto = (id: number) => {
    const productosFiltrados = productos.filter((p) => p.id !== id);
    setProductos(productosFiltrados);
  };

  const recuperarDatos = () => {
    console.log('Productos y Subproductos:', productos);
    alert('Mira la consola para ver los productos y sus subproductos.');
  };

  return (
    <div>
      <h2>Gestor de Productos</h2>
      {productos.map((producto) => (
        <ProductoComponent
          key={producto.id}
          producto={producto}
          onChange={actualizarProducto}
          onRemove={eliminarProducto}
        />
      ))}
      <button onClick={agregarProducto}>Agregar Producto</button>
      <button onClick={recuperarDatos}>Recuperar Productos</button>
    </div>
  );
};

export default GestorProductos;
