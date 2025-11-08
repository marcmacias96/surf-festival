// Escuchar eventos de actualización de estado y actualizar estadísticas
window.addEventListener('registration-status-updated', ((event: Event) => {
  const customEvent = event as CustomEvent<{ registrationId: string; oldStatus: string; newStatus: string }>;
  const { oldStatus, newStatus } = customEvent.detail;
  
  // Obtener elementos de contadores
  const approvedCountEl = document.getElementById('approved-count');
  const rejectedCountEl = document.getElementById('rejected-count');
  const pendingCountEl = document.getElementById('pending-count');
  const balanceEl = document.querySelector('.balance-amount');
  const balanceContainer = document.querySelector('[data-registration-price]');
  
  if (!approvedCountEl || !rejectedCountEl || !pendingCountEl) return;
  
  // Obtener valores actuales
  let approvedCount = parseInt(approvedCountEl.textContent || '0', 10);
  let rejectedCount = parseInt(rejectedCountEl.textContent || '0', 10);
  let pendingCount = parseInt(pendingCountEl.textContent || '0', 10);
  
  // Obtener precio de inscripción del data attribute o usar valor por defecto
  const registrationPrice = balanceContainer 
    ? parseFloat(balanceContainer.getAttribute('data-registration-price') || '10')
    : 10;
  
  // Actualizar contadores según el cambio de estado
  if (oldStatus === 'approved') {
    approvedCount = Math.max(0, approvedCount - 1);
  } else if (oldStatus === 'rejected') {
    rejectedCount = Math.max(0, rejectedCount - 1);
  } else if (oldStatus === 'pending') {
    pendingCount = Math.max(0, pendingCount - 1);
  }
  
  if (newStatus === 'approved') {
    approvedCount += 1;
  } else if (newStatus === 'rejected') {
    rejectedCount += 1;
  } else if (newStatus === 'pending') {
    pendingCount += 1;
  }
  
  // Calcular nuevo balance
  const balance = approvedCount * registrationPrice;
  
  // Actualizar el DOM
  approvedCountEl.textContent = approvedCount.toString();
  rejectedCountEl.textContent = rejectedCount.toString();
  pendingCountEl.textContent = pendingCount.toString();
  
  // Actualizar balance si existe el elemento
  if (balanceEl) {
    balanceEl.textContent = `$${balance.toFixed(2)}`;
  }
  
  // Actualizar texto descriptivo del balance
  const balanceDescription = document.querySelector('.balance-description');
  if (balanceDescription) {
    const firstDiv = balanceDescription.querySelector('div:first-child');
    const secondDiv = balanceDescription.querySelector('div:last-child');
    if (firstDiv) {
      firstDiv.textContent = `${approvedCount} inscripciones aprobadas`;
    }
    if (secondDiv) {
      secondDiv.textContent = `× $${registrationPrice.toFixed(2)} por inscripción`;
    }
  }
}) as EventListener);

